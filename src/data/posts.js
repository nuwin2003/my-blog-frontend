export const categories = ['All', 'Bug Fixes', 'New Tech', 'Engineering Process', 'Product Thoughts'];

export const posts = [
  { id: 'race-condition', category: 'Bug Fixes', title: 'The race condition that only happened on Tuesdays', excerpt: 'A production incident, two misleading traces, and the tiny timing window hiding between a cache write and an event.', date: 'Aug 12, 2026', readTime: '8 min read', number: '01', color: '#69BDF5', featured: true },
  { id: 'ai-agents', category: 'New Tech', title: 'AI agents need better failure states', excerpt: 'What building with autonomous workflows taught me about trust, progress, and designing for graceful recovery.', date: 'Aug 06, 2026', readTime: '6 min read', number: '02', color: '#A98FF7' },
  { id: 'reviews', category: 'Engineering Process', title: 'Code review is a design conversation', excerpt: 'A practical system for making reviews faster, kinder, and more valuable than a final gate before merge.', date: 'Jul 28, 2026', readTime: '5 min read', number: '03', color: '#66D5C5' },
  { id: 'boring-software', category: 'Product Thoughts', title: 'The case for delightfully boring software', excerpt: 'Why invisible reliability often creates more product love than the flashiest feature on the roadmap.', date: 'Jul 19, 2026', readTime: '7 min read', number: '04', color: '#F2A868' },
  { id: 'memory-leak', category: 'Bug Fixes', title: 'Hunting a 12-byte memory leak', excerpt: 'Following a slow-burn Node.js memory problem from a noisy heap graph to one forgotten listener.', date: 'Jul 11, 2026', readTime: '9 min read', number: '05', color: '#F17B91' },
  { id: 'local-first', category: 'New Tech', title: 'Local-first changes the product conversation', excerpt: 'Sync engines are getting better. The more interesting shift is what they let product teams promise users.', date: 'Jul 02, 2026', readTime: '6 min read', number: '06', color: '#5BA9F2' },
];

export const article = {
  ...posts[0],
  intro: 'On Tuesday morning, a customer saw an invoice revert to its previous state. Ten seconds later it corrected itself. Nothing crashed. Every dashboard was green.',
  sections: [
    { id: 'signal', title: 'Finding the signal', body: 'The first clue was not an error but an ordering mismatch. Two valid events were reaching the read model in the wrong sequence. Our timestamps looked authoritative, but they represented creation time—not processing order.' },
    { id: 'model', title: 'Build a smaller model', body: 'I reduced the workflow to a tiny test: one cache write, one event, and an artificial network delay. Once the surrounding system disappeared, the bug became wonderfully ordinary.' },
    { id: 'fix', title: 'The boring fix', body: 'We made writes idempotent and attached a monotonically increasing version to each record. The consumer now rejects stale events instead of trusting arrival order.' },
    { id: 'lesson', title: 'What I kept', body: 'Distributed systems rarely fail with cinematic explosions. They fail through individually reasonable decisions interacting in unreasonable ways. The best debugging tool was a model small enough to hold in my head.' },
  ],
};
