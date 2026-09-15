/**
 * Mock Field Visits Dataset
 * Adheres to Section 4.5 & Section 7 (Offline Field Visit Mode)
 */

export const MOCK_FIELD_VISITS = [
  {
    id: 'fv-101',
    ngoId: 'ngo-1',
    ngoName: 'Bachpan Bachao Trust',
    projectTitle: 'Mission Shiksha: Delhi Slum Education Drive',
    staffName: 'Priya Sharma',
    scheduledDate: '2026-10-05',
    status: 'scheduled', // 'scheduled' | 'in_progress' | 'completed' | 'synced' | 'draft_offline'
    location: 'Seelampur & Gautampuri Clusters, Delhi',
    objectives: [
      'Audit 4 bridge learning centers for attendance registers',
      'Inspect mid-day nutrition distribution hygiene',
      'Interview 5 adolescent peer leaders regarding school re-enrollment',
      'Verify physical receipts for textbook purchases against ledger',
    ],
    completedActivities: ['Verify physical receipts for textbook purchases against ledger'],
    notes: 'Prior visit identified high dropout rate among 12-14 age group due to sibling caretaking.',
    cachedLocally: true,
    lastDraftSaved: '2026-09-14T10:30:00Z',
    pendingSync: false,
  },
  {
    id: 'fv-102',
    ngoId: 'ngo-3',
    ngoName: 'Shakti Child Foundation',
    projectTitle: 'Balika Suraksha: Desert Border Child Protection',
    staffName: 'Priya Sharma',
    scheduledDate: '2026-09-28',
    status: 'scheduled',
    location: 'Chohtan & Dhorimanna Tehsil, Barmer, Rajasthan',
    objectives: [
      'Meet Village Child Protection Committee (VCPC) members',
      'Check emergency transit shelter registers',
      'Observe adolescent girls self-help workshop',
      'Address critical FC-4 compliance filing blockage with director',
    ],
    completedActivities: [],
    notes: 'Very remote desert region with no mobile network connectivity in 6 target villages.',
    cachedLocally: true,
    lastDraftSaved: null,
    pendingSync: false,
  },
  {
    id: 'fv-103',
    ngoId: 'ngo-2',
    ngoName: 'Rural Child Development Initiative',
    projectTitle: 'Poshan & Swasthya: Sitapur Nutrition Project',
    staffName: 'Priya Sharma',
    scheduledDate: '2026-08-02',
    status: 'completed',
    location: 'Sitapur Block 4, Uttar Pradesh',
    objectives: [
      'Growth monitoring weight check validation',
      'Quarterly financial voucher spot-audit',
    ],
    completedActivities: [
      'Growth monitoring weight check validation',
      'Quarterly financial voucher spot-audit',
    ],
    notes: 'Observed 18% improvement in normal weight band across 120 enrolled toddlers.',
    cachedLocally: false,
    lastDraftSaved: '2026-08-02T16:45:00Z',
    pendingSync: false,
  },
];
