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
    console.log('No new changes to commit or commit clean.');
  }

  console.log(`Pushing branch ${branch} to origin...`);
  execSync(`git push -u origin ${branch} --force`, { stdio: 'inherit' });

  console.log(`Creating Pull Request on GitHub: "${prTitle}"...`);
  let prNumber = null;

  try {
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

    const text = await prRes.text();
    const prData = text ? JSON.parse(text) : {};

    if (prRes.ok) {
      prNumber = prData.number;
      console.log(`Created PR #${prNumber}: ${prData.html_url}`);
    } else {
      console.log(`PR creation response (${prRes.status}):`, prData?.message || text);
    }
  } catch (err) {
    console.error('Error creating PR:', err.message);
  }

  if (!prNumber) {
    // Find open PR for this branch
    const listRes = await fetch(`https://api.github.com/repos/nikhila9876/CRY_org/pulls?head=nikhila9876:${branch}&state=open`, { headers });
    const listData = await listRes.json();
    if (listData && listData.length > 0) {
      prNumber = listData[0].number;
      console.log(`Found existing open PR #${prNumber}`);
    } else {
      throw new Error(`Could not find or create open PR for ${branch}`);
    }
  }

  return mergeExistingPR(prNumber, prTitle, headers);
}

async function mergeExistingPR(prNumber, prTitle, headers) {
  console.log(`Merging PR #${prNumber} into main (merge commit, no squash)...`);

  let merged = false;
  for (let attempt = 1; attempt <= 6; attempt++) {
    // Wait for GitHub to finish calculating mergeability
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const mergeRes = await fetch(`https://api.github.com/repos/nikhila9876/CRY_org/pulls/${prNumber}/merge`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          commit_title: prTitle,
          merge_method: 'merge',
        }),
      });

      const resText = await mergeRes.text();
      const mergeData = resText ? JSON.parse(resText) : {};

      if (mergeRes.ok && (mergeData.merged || mergeRes.status === 200)) {
        console.log(`Successfully merged PR #${prNumber}: ${mergeData.message || 'Merged'}`);
        merged = true;
        break;
      } else {
        console.log(`Attempt ${attempt}: Merge returned status ${mergeRes.status}: ${mergeData.message || resText}. Retrying...`);
      }
    } catch (e) {
      console.log(`Attempt ${attempt} network error:`, e.message);
    }
  }

  if (!merged) {
    throw new Error(`Failed to merge PR #${prNumber} after several attempts.`);
  }

  console.log(`Switching back to main and syncing local...`);
  execSync(`git checkout main`, { stdio: 'inherit' });
  execSync(`git pull origin main`, { stdio: 'inherit' });

  return { prNumber, message: 'Merged successfully' };
}

// CLI runner
if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/pr_helper.js')) {
  const args = process.argv.slice(2);
  const getArg = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 ? args[idx + 1] : null;
  };
  const branch = getArg('--branch');
  const commitMessage = getArg('--commit');
  const prTitle = getArg('--title');
  const prBody = getArg('--body') || prTitle;

  if (!branch || !commitMessage || !prTitle) {
    console.error('Usage: node scripts/pr_helper.js --branch <branch> --commit <commitMsg> --title <prTitle> [--body <prBody>]');
    process.exit(1);
  }

  createAndMergePR({ branch, commitMessage, prTitle, prBody })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

