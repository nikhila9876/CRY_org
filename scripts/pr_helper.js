import { execSync } from 'node:child_process';

function getGitToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    const creds = execSync('git credential fill', { input: 'protocol=https\nhost=github.com\n' }).toString();
    const match = creds.match(/password=(.+)/);
    if (match) return match[1].trim();
  } catch (e) {
    console.error('Failed to get git credentials:', e.message);
  }
  return null;
}

export async function createAndMergePR({ branch, commitMessage, prTitle, prBody }) {
  const token = getGitToken();
  if (!token) throw new Error('No GitHub token found in git credentials or GITHUB_TOKEN');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'NGO360-PR-Runner',
    'Content-Type': 'application/json',
  };

  console.log(`\n======================================================`);
  console.log(`Creating branch: ${branch}`);
  execSync(`git checkout -B ${branch}`, { stdio: 'inherit' });

  console.log(`Staging files and committing: ${commitMessage}`);
  execSync(`git add -A`, { stdio: 'inherit' });
  try {
    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('No new changes to commit or commit failed.');
  }

  console.log(`Pushing branch ${branch} to origin...`);
  execSync(`git push -u origin ${branch} --force`, { stdio: 'inherit' });

  console.log(`Creating Pull Request on GitHub: "${prTitle}"...`);
  const prRes = await fetch('https://api.github.com/repos/nikhila9876/CRY_org/pulls', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: prTitle,
      head: branch,
      base: 'main',
      body: prBody,
    }),
  });

  const prData = await prRes.json();
  if (!prRes.ok) {
    // If PR already exists for this branch, find existing PR
    if (prData.errors && prData.errors[0]?.message?.includes('A pull request already exists')) {
      console.log('PR already exists, fetching existing PR...');
      const listRes = await fetch(`https://api.github.com/repos/nikhila9876/CRY_org/pulls?head=nikhila9876:${branch}`, { headers });
      const listData = await listRes.json();
      if (listData.length > 0) {
        return mergeExistingPR(listData[0].number, prTitle, headers);
      }
    }
    throw new Error(`Failed to create PR: ${prRes.status} ${JSON.stringify(prData)}`);
  }

  console.log(`Created PR #${prData.number}: ${prData.html_url}`);
  return mergeExistingPR(prData.number, prTitle, headers);
}

async function mergeExistingPR(prNumber, prTitle, headers) {
  console.log(`Merging PR #${prNumber} into main (merge commit, no squash)...`);
  // Brief delay to ensure GitHub processes the ref
  await new Promise((r) => setTimeout(r, 1500));

  const mergeRes = await fetch(`https://api.github.com/repos/nikhila9876/CRY_org/pulls/${prNumber}/merge`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      commit_title: prTitle,
      merge_method: 'merge',
    }),
  });

  const mergeData = await mergeRes.json();
  if (!mergeRes.ok) {
    throw new Error(`Failed to merge PR #${prNumber}: ${mergeRes.status} ${JSON.stringify(mergeData)}`);
  }

  console.log(`Successfully merged PR #${prNumber}: ${mergeData.message}`);

  console.log(`Switching back to main and syncing local...`);
  execSync(`git checkout main`, { stdio: 'inherit' });
  execSync(`git pull origin main`, { stdio: 'inherit' });

  return { prNumber, message: mergeData.message };
}
