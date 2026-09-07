/**
 * Dana Blog — content.
 *
 * All 14 posts here are real dana.money articles (fetched from dana.money/blog and each
 * dana.money/blog-details/{id} page, Jan 2026) — titles, dates, and body content are sourced from
 * the live site, not invented. Two honesty notes on fidelity, so this isn't mistaken for a raw
 * scrape:
 *   1. The fetch tool returns a text-model's rendering of each page, not raw HTML, so body copy
 *      below is a close paraphrase of the source for most posts rather than a byte-exact copy —
 *      a handful (marked with `verbatim: true`) came back as clean blockquoted prose and are
 *      reproduced as fetched.
 *   2. dana.money's own article pages carry no author, read time, or "related posts" section, and
 *      only ever use one category ("Business") across all 14 posts. `readTimeMinutes` is computed
 *      here from word count (200wpm), and `tags` are our own finer-grained topic labels (not
 *      present on the source) added purely so the site can group and surface related posts —
 *      see getRelatedPosts below.
 *
 * Card/cover images: dana.money's own article pages don't expose usable cover-image assets (see
 * BlogCard's earlier no-image gradient-banner treatment), so each post below carries
 * `imageKeywords` — topic keywords used to fetch a real, topically-relevant stock photo from
 * loremflickr.com (a keyword-based stock-photo-by-tag service backed by real Flickr photos, not
 * AI-generated or fabricated). `imageUrlFor` below pins each post to one specific photo via
 * `?lock={sourceId}` so the image stays stable across reloads instead of re-randomizing per
 * request — see next.config.mjs for the required remotePatterns entry.
 */

export type BlogPost = {
  slug: string;
  sourceId: number; // dana.money/blog-details/{id}, kept for traceability back to the source
  title: string;
  date: string;
  tags: string[];
  imageKeywords: string;
  /** true = reproduced as fetched (clean prose); omitted/false = paraphrased from a summarized fetch. */
  verbatim?: boolean;
  body: string[]; // paragraphs; a paragraph starting with "## " renders as an in-article heading
};

export function imageUrlFor(post: Pick<BlogPost, "imageKeywords" | "sourceId">): string {
  return `https://loremflickr.com/800/450/${post.imageKeywords}?lock=${post.sourceId}`;
}

const POSTS: BlogPost[] = [
  {
    slug: "building-a-successful-startup-lessons-from-tech-giants",
    sourceId: 12,
    title: "Building a Successful Startup: Lessons from Tech Giants",
    date: "Dec 25, 2025",
    tags: ["Startups"],
    imageKeywords: "startup,team,office",
    body: [
      "Building a startup is one of the most challenging yet rewarding endeavors in the business world — and the experiences of today's tech giants offer practical guidance for entrepreneurs willing to learn from them.",
      "## Clear Vision",
      "Apple and Google both started with clearly defined objectives. A strong mission statement does more than sit on a website — it drives team alignment, keeping everyone pointed at the same outcome even as the company scales.",
      "## User Experience Priority",
      "Amazon shows what happens when customer satisfaction becomes the core driver of a company's success: prioritizing experience over immediate returns compounds into long-term loyalty and growth.",
      "## Learning from Failure",
      "Facebook's philosophy of rapid iteration treats mistakes as educational opportunities rather than setbacks — shipping, learning, and adjusting faster than the competition.",
      "## Putting It Into Practice",
      "Five steps turn these lessons into action: validate with real users before building, ship an MVP instead of a finished product, build a tight feedback loop, focus on sustainable metrics over vanity ones, and invest early in team culture.",
    ],
  },
  {
    slug: "the-future-of-savings-will-apps-replace-traditional-banks",
    sourceId: 27,
    title: "The Future of Savings: Will Apps Replace Traditional Banks?",
    date: "Jan 25, 2026",
    tags: ["Savings & Investing", "Fintech vs Banking"],
    imageKeywords: "bank,savings,money",
    verbatim: false,
    body: [
      "Saving money used to mean visiting a bank branch and opening a fixed deposit. Today, many people save through mobile apps, digital wallets, and fintech platforms.",
      "Fintech savings apps offer convenience, better user experience, and instant access. They let users save small amounts daily, track goals, and earn rewards — turning saving into something closer to a habit than a chore.",
      "Traditional banks still have real strengths, though: strong regulatory protection, larger balance capacity, and more diverse financial products than most standalone apps can offer.",
      "The future is likely to be a hybrid model, where fintech apps handle the day-to-day user experience and banks provide the underlying infrastructure — a combination that ultimately benefits consumers with better financial tools than either could deliver alone.",
    ],
  },
  {
    slug: "side-hustles-in-a-mobile-wallet-economy",
    sourceId: 26,
    title: "Side Hustles in a Mobile Wallet Economy: How Bangladeshis Are Earning Smarter",
    date: "Jan 25, 2026",
    tags: ["Payments", "Financial Inclusion"],
    imageKeywords: "mobilepayment,smartphone,freelance",
    body: [
      "Mobile wallets make it easy to receive payments from clients, platforms, and customers — and that ease is quietly reshaping how people in Bangladesh earn a living.",
      "Freelance designers, online resellers, and content creators are among the biggest beneficiaries, gaining access to payment systems that simply weren't available to them before. Anyone with a smartphone can now participate in the digital economy — expanding opportunities for students, young people, and homemakers alike.",
      "A quieter but equally important shift is happening underneath: every mobile wallet transaction creates a record. Transaction histories can later be used to access loans, insurance, and investment products — turning informal earning into a documented financial history.",
      "Fintech is not just changing how people spend — it is changing how they earn, particularly in a region where conventional employment options are constrained.",
    ],
  },
  {
    slug: "why-your-bank-balance-lies",
    sourceId: 25,
    title: "Why Your Bank Balance Lies: The Psychology Behind Spending in the Digital Age",
    date: "Jan 25, 2026",
    tags: ["Psychology of Spending", "Payments"],
    imageKeywords: "creditcard,payment,shopping",
    verbatim: true,
    body: [
      "Many people feel confused when their bank balance drops faster than expected. They don't remember spending that much, yet the numbers tell a different story. This is not just poor budgeting — it is psychology.",
      "Digital payments remove the \"pain\" of spending. When you tap a phone or scan a QR code, there is no physical cash leaving your hand. Studies show that people spend more when they use cards or wallets compared to cash because the transaction feels less real.",
      "Fintech apps also encourage spending through cashback offers, reward points, and one-click payments. These features make spending feel rewarding and effortless. Over time, this creates a habit of frequent, small purchases that add up.",
      "Another factor is delayed awareness. With cash, you see your wallet getting empty. With digital money, you only see the impact when you check your balance — often too late. This disconnect leads to overspending without guilt.",
      "The solution is not to avoid digital finance, but to use it more mindfully. Budgeting tools, spending alerts, and transaction summaries can help users stay in control. Fintech platforms that promote financial awareness alongside convenience will build stronger, more loyal users.",
      "Understanding the psychology behind digital spending is the first step toward healthier financial habits in a cashless world.",
    ],
  },
  {
    slug: "from-cash-to-qr",
    sourceId: 24,
    title: "From Cash to QR: How Digital Payments Are Reshaping Small Businesses",
    date: "Jan 25, 2026",
    tags: ["Payments", "Financial Inclusion"],
    imageKeywords: "qrcode,payment,shop",
    body: [
      "Just a few years ago, cash dominated every corner of Bangladesh's economy. Today, QR code payment systems from bKash, Nagad, and banks appear throughout small retail spaces.",
      "Digital transactions give shop owners immediate access to funds without worrying about making change, counterfeit currency, or managing cash at the end of the day. Every transaction also generates a permanent digital record, letting merchants analyze sales trends, customer activity, and busy periods.",
      "Those payment histories are becoming valuable assets in their own right. Fintechs and banks increasingly use them to extend working capital to small enterprises — a business with consistent QR transaction activity can document real revenue without a traditional accounting system, unlocking credit that was previously out of reach.",
      "Digital acceptance also builds consumer confidence: younger and urban shoppers gravitate toward businesses that accept digital wallets, which can drive more foot traffic and revenue.",
      "Connectivity gaps and processing charges remain real obstacles, but QR payments are fundamentally turning informal enterprises into digitally documented businesses — letting small merchants grow and access financing at a scale that wasn't possible before.",
    ],
  },
  {
    slug: "how-ai-is-quietly-deciding-who-gets-loans-in-bangladesh",
    sourceId: 23,
    title: "How AI Is Quietly Deciding Who Gets Loans in Bangladesh",
    date: "Jan 25, 2026",
    tags: ["AI & Lending", "Financial Inclusion"],
    imageKeywords: "artificialintelligence,technology,finance",
    body: [
      "When someone applies for a digital loan today, the decision is no longer made only by a bank officer sitting behind a desk. In Bangladesh, fintech platforms are increasingly using AI to decide who qualifies for credit — and who doesn't.",
      "Traditional banks relied heavily on salary slips, collateral, and past bank records. Millions of people in Bangladesh don't have these. AI-powered credit engines close that gap with alternative data — mobile wallet transactions, utility payments, mobile top-ups, e-commerce behavior, and even repayment patterns from microloans.",
      "AI models analyze thousands of such data points in seconds, spotting patterns humans can't: how consistently someone pays bills, how stable their income is, or how their spending changes over time. That lets fintechs offer loans to small shop owners, freelancers, and gig workers who were previously invisible to the banking system.",
      "This raises real questions too. Transparency is critical — users must understand why a loan was approved or rejected. If the underlying data is poor or biased, AI decisions can be unfair, which is why responsible fintech companies are investing in explainable AI and strong data governance.",
      "The future of lending in Bangladesh won't be driven by paperwork — it will be driven by data. As digital footprints grow through wallets, apps, and online payments, AI will keep reshaping financial access. The challenge is making that technology both powerful and fair.",
    ],
  },
  {
    slug: "pay-yourself-first",
    sourceId: 22,
    title: "Pay Yourself First: A Core Principle of Smart Money Management",
    date: "Jan 13, 2026",
    tags: ["Budgeting", "Savings & Investing"],
    imageKeywords: "savings,piggybank,money",
    verbatim: true,
    body: [
      "One of the simplest yet most powerful money management habits is to pay yourself first. This means setting aside a portion of your income for savings and investments before spending on anything else — bills, rent, or daily expenses. It's a mindset that prioritizes your future over your present wants.",
      "Most people treat saving as what's \"left over\" after spending. Unfortunately, that approach rarely works — life's expenses tend to expand with our income. By automating savings, say, transferring 10–20% of your paycheck to a separate account, you ensure consistency without relying on willpower.",
      "This approach creates long-term benefits: an emergency fund that protects you during tough times, accumulated wealth for future goals, and reduced financial anxiety. Whether it's a DPS (Deposit Pension Scheme), mutual fund, or a digital savings plan, the key is consistency.",
      "Think of saving as paying your \"future self\" — a form of self-respect and responsibility. It's not about depriving yourself today; it's about ensuring security and freedom tomorrow. Once you start paying yourself first, your spending naturally adjusts to what remains — and that's the essence of disciplined financial living.",
      "Remember: wealth isn't built by how much you earn, but by how much you keep and grow.",
    ],
  },
  {
    slug: "the-basics-of-financial-wellness",
    sourceId: 21,
    title: "The Basics of Financial Wellness: Understanding Where Your Money Goes",
    date: "Jan 13, 2026",
    tags: ["Budgeting"],
    imageKeywords: "budget,finance,notebook",
    body: [
      "Financial wellness begins with awareness rather than income level. Knowing exactly where your money goes each month is the foundation of smart money management — small recurring expenses often accumulate unnoticed over time.",
      "The recommended approach is to track every expenditure for at least a month, across categories like housing, food, travel, and discretionary spending. Budgeting apps, payment platforms, or even a basic spreadsheet can reveal spending tendencies you didn't know you had.",
      "A structured budget framework helps: the 50/30/20 guideline is a good baseline — half of earnings toward necessities, 30% toward preferences, and 20% toward savings and investment.",
      "Understanding your spending patterns reduces anxiety, strengthens financial accumulation, and improves decision-making — reframing budgeting as directional guidance rather than deprivation.",
    ],
  },
  {
    slug: "how-ai-and-automation-are-changing-the-way-we-save-and-invest",
    sourceId: 19,
    title: "How AI and Automation Are Changing the Way We Save and Invest",
    date: "Jan 13, 2026",
    tags: ["AI & Lending", "Savings & Investing"],
    imageKeywords: "robot,investing,stockmarket",
    body: [
      "The financial sector is undergoing rapid transformation. Automation and artificial intelligence are at the core of this change, reshaping how we invest, save, and manage our finances.",
      "AI-powered fintech apps examine spending habits and identify savings opportunities, automatically routing funds toward financial goals. Users can accomplish in seconds what previously required spreadsheets and a professional consultation.",
      "Robo-advisors have democratized investment management — offering customized portfolio guidance aligned with individual risk profiles and objectives, often at a fraction of the cost of a conventional financial advisor, while continuously monitoring markets and rebalancing holdings.",
      "Automation also builds saving discipline through features like automatic transfers and round-up investments, keeping progress going regardless of life's distractions.",
      "Modern finance is convenient, but it's also proactive, intelligent, and inclusive — AI and automation are putting tools for building financial security within reach at every experience level.",
    ],
  },
  {
    slug: "the-psychology-of-spending",
    sourceId: 18,
    title: "The Psychology of Spending",
    date: "Jan 13, 2026",
    tags: ["Psychology of Spending"],
    imageKeywords: "shopping,retail,consumer",
    body: [
      "Why do consumers make impulsive purchasing decisions? A few psychological mechanisms explain most of it.",
      "## Emotional Spending",
      "Shopping often serves as a coping mechanism for stress, boredom, or loneliness — offering temporary relief through instant gratification.",
      "## Social Proof",
      "People are influenced by watching others buy, especially influencers and peers, associating products with success or happiness.",
      "## Scarcity Marketing",
      "Limited-time offers create urgency and fear of missing out, prompting purchases people wouldn't otherwise make despite the sales-driven pricing.",
      "## Dopamine Response",
      "The brain releases dopamine during a purchase, creating a \"shopping high\" that encourages repeat behavior.",
      "The fix is practical: pause before purchases and ask whether you truly need the item, use a cooling-off period, and lean on budgeting apps to track spending patterns and emotional triggers — prioritizing long-term value over momentary satisfaction.",
    ],
  },
  {
    slug: "the-psychology-of-spending-why-we-buy-what-we-dont-need",
    sourceId: 17,
    title: "The Psychology of Spending: Why We Buy What We Don't Need",
    date: "Jan 13, 2026",
    tags: ["Psychology of Spending"],
    imageKeywords: "shoppingbags,mall,consumer",
    verbatim: true,
    body: [
      "Have you ever walked into a store for one item and walked out with five? Or scrolled through an online shop and clicked \"Buy Now\" on things you didn't even know you wanted? You're not alone. Behind these everyday decisions lies a fascinating mix of psychology, emotion, and clever marketing.",
      "## Emotional Triggers Drive Our Spending",
      "We often think we buy things based on logic, but in reality, our emotions lead the way. Stress, boredom, loneliness, or even happiness can trigger spending. It's called emotional spending — when shopping becomes a coping mechanism rather than a necessity. A quick purchase offers instant gratification, making us feel better in the moment, even if we regret it later.",
      "## The Influence of Social Proof and Trends",
      "Humans are social creatures. When we see others using a product — especially influencers or friends — we're more likely to want it too. This is known as social proof. Whether it's the latest phone, fashion, or lifestyle trend, we subconsciously associate these items with success, popularity, or happiness.",
      "## The Illusion of Deals and Discounts",
      "Ever bought something just because it was 50% off? That's scarcity marketing at work. Limited-time offers and flash sales create urgency. We fear missing out on a \"great deal,\" even if we don't truly need the product. The rush of \"saving money\" often overshadows the reality of unnecessary spending.",
      "## Dopamine and the Shopping High",
      "Every time we make a purchase, our brain releases dopamine — a feel-good chemical. It's the same one released when we eat chocolate or get a compliment. This chemical reaction can lead to a \"shopping high,\" making us crave more purchases to feel that pleasure again.",
      "## How to Take Control",
      "Awareness is the first step. Start by asking yourself: Do I need this? Will I still want it tomorrow? Setting a cooling-off period before buying can help filter impulse decisions. Budgeting apps and digital tools can also provide insight into your spending patterns and emotional triggers.",
      "Understanding the psychology behind our spending habits doesn't mean we have to stop shopping. It simply means we can make more intentional choices — saving money, reducing clutter, and building a healthier relationship with money.",
      "We buy things we don't need not because we're irrational, but because we're human. By recognizing the emotions and tactics that drive our decisions, we can become more mindful consumers — ones who spend not just for the moment, but for long-term value and well-being.",
    ],
  },
  {
    slug: "fintech-regulation-in-bangladesh",
    sourceId: 16,
    title: "FinTech Regulation in Bangladesh: What Startups Should Know",
    date: "Jan 13, 2026",
    tags: ["Regulation", "Startups"],
    imageKeywords: "law,government,finance",
    verbatim: true,
    body: [
      "The FinTech landscape in Bangladesh is growing rapidly, offering innovative solutions in digital payments, lending, personal finance, and more. But with growth comes the responsibility of operating within a well-defined regulatory framework — for startups entering or expanding in this space, understanding that environment isn't just important, it's essential.",
      "## Regulatory Authorities You Must Know",
      "The primary regulatory body for FinTechs in Bangladesh is Bangladesh Bank (BB), which oversees payment systems, mobile financial services (MFS), digital banks, and alternative credit scoring mechanisms. The Bangladesh Securities and Exchange Commission (BSEC) also plays a role when FinTechs deal with digital assets, investments, or capital markets, and the Digital Security Act 2018 and ICT Act govern data protection and digital services.",
      "## Licensing and Approval Requirements",
      "Startups offering payment services must register as a Payment Service Provider (PSP) or Payment System Operator (PSO) with Bangladesh Bank. MFS providers must partner with a licensed bank, since standalone MFS licenses aren't currently issued to non-banking entities. FinTechs engaging in lending or credit scoring must align with BB's credit information policies and may need partnerships with NBFIs or banks to operate legally.",
      "## Digital Bank Guidelines",
      "In 2023, Bangladesh Bank introduced guidelines for establishing Digital Banks. Startups with strong tech foundations and access to capital can apply, provided they meet the minimum capital requirement of BDT 125 crore and demonstrate strong governance, cybersecurity, and financial inclusion strategies — a real opportunity, but one that demands rigorous compliance.",
      "## Data Privacy and Cybersecurity Compliance",
      "FinTechs handle sensitive financial and personal data, so compliance with data security and anti-money laundering (AML) standards is critical. Bangladesh Financial Intelligence Unit (BFIU) guidelines must be followed for AML/CFT compliance, and cybersecurity frameworks aligned with Bangladesh Bank's directives are a must for building trust and gaining regulatory approval.",
      "## Challenges Startups Face",
      "One major challenge is the absence of a unified FinTech law — startups often navigate a complex web of banking, digital security, and financial laws. Regulatory sandboxes or clearer startup-specific policies would help foster innovation while ensuring compliance, and many early-stage founders still aren't fully aware of the licenses or reporting obligations they need to fulfill.",
      "Regulatory compliance might seem daunting, but it's a cornerstone of long-term success in Bangladesh's FinTech ecosystem. Engaging early with regulators, seeking legal counsel, and staying current on evolving policy will help startups avoid costly mistakes and build user trust — the FinTechs that balance innovation with responsibility will lead the way.",
    ],
  },
  {
    slug: "is-open-banking-the-game-changer-fintech-promised",
    sourceId: 15,
    title: "Is Open Banking the Game Changer Fintech Promised?",
    date: "Jan 13, 2026",
    tags: ["Fintech vs Banking", "Regulation"],
    imageKeywords: "bank,technology,api",
    verbatim: true,
    body: [
      "## What is Open Banking?",
      "Open Banking refers to a system where banks and financial institutions share customer data (with their permission) securely through APIs with third-party service providers. The goal is simple: let customers benefit from more personalized, competitive, and user-friendly financial services.",
      "## Why Was It Promised as a Game Changer?",
      "The traditional banking model has long been rigid, slow, and often not built for the digitally native generation. Fintech companies saw Open Banking as a chance to break these silos and create seamless financial experiences — from budgeting apps that track spending in real time to instant loan approvals using alternative data, Open Banking promised speed, convenience, and inclusion. It also meant increased competition, which should lead to better rates, lower fees, and more transparency, with significant potential for underserved populations and small businesses in developing markets.",
      "## What Has It Delivered So Far?",
      "Open Banking has certainly made a mark. In markets like the UK and Europe, millions of users now use apps powered by Open Banking to manage finances, make smarter spending decisions, and access faster credit, while banks adapt by building better digital services or partnering with fintechs. Emerging markets like Bangladesh are also beginning to explore Open Banking frameworks — connecting mobile financial services and digital lenders with traditional banking data lets fintech startups offer more tailored products to the underbanked, a major leap toward financial inclusion.",
      "## The Challenges",
      "Despite the promise, Open Banking still faces hurdles: data security and privacy remain top concerns, many banks are slow to open up, and standardization is still a work in progress across regions. User adoption can also be low when trust and awareness are lacking, and in developing countries the infrastructure to support full-scale Open Banking is still evolving.",
      "## So, Is It the Game Changer?",
      "Yes — but not overnight. Open Banking has laid the foundation for a more connected, inclusive, customer-first financial ecosystem, and it's already changing how people access and interact with financial services, especially where innovation is matched with strong regulation and collaboration. The real game-changing potential lies in what comes next: embedded finance, AI-powered financial advice, and a truly open ecosystem where the customer is at the center. Fintech made the promise — Open Banking is delivering, step by step.",
    ],
  },
  {
    slug: "how-to-master-money",
    sourceId: 13,
    title: "How to Master Money",
    date: "Dec 25, 2025",
    tags: ["Budgeting"],
    imageKeywords: "budgeting,coins,wallet",
    verbatim: true,
    body: [
      "Making a budget doesn't have to be difficult. Whether you want to quit living paycheck to paycheck or save for a large goal, the important thing is to set up a method that you will follow. These five easy budgeting tips will help you manage your finances without feeling overburdened.",
      "## Use the 50/30/20 Rule",
      "Set aside 50% of your income for necessities, 30% for wants, and 20% for debt reduction or savings. This simple structure works without a complex spreadsheet.",
      "## Automate Everything",
      "Configure automatic bill payment and savings transfers. Without requiring willpower, automation guarantees that your goals are constantly reached and lessens the desire to spend.",
      "## Track Spending Weekly, Not Monthly",
      "Weekly spending checks let you see where your money is going in real time. Instead of waiting until the end of the month, it's simpler to identify poor habits early and make adjustments.",
      "## Use a Budgeting App",
      "Let technology handle the labor-intensive tasks. A smart fintech app can save you hours by classifying your expenses, setting notifications, and giving you a comprehensive picture of your financial health in a single glance.",
      "## Try a \"No-Spend\" Challenge",
      "Decide to spend no money on non-essentials for one week (or weekend) per month. It's a great way to reset and identify areas where you can make painless cuts.",
      "The goal of budgeting is to make your money work for you, not to restrict it. Your financial confidence will increase if you start modest and remain consistent.",
    ],
  },
];

function wordCount(paragraphs: string[]): number {
  return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

export function getAllPosts(): (BlogPost & { readTimeMinutes: number; imageUrl: string })[] {
  return POSTS.map((post) => ({
    ...post,
    readTimeMinutes: Math.max(1, Math.round(wordCount(post.body) / 200)),
    imageUrl: imageUrlFor(post),
  })).sort((a, b) => b.sourceId - a.sourceId);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

/** Shares at least one tag with the current post; falls back to most recent others if none tag-match. */
export function getRelatedPosts(current: BlogPost, limit = 3) {
  const all = getAllPosts().filter((post) => post.slug !== current.slug);
  const tagged = all.filter((post) => post.tags.some((tag) => current.tags.includes(tag)));
  const rest = all.filter((post) => !tagged.includes(post));
  return [...tagged, ...rest].slice(0, limit);
}
