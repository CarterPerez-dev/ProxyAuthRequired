db.achievements.insertMany([
  {
    _id: ObjectId("679ef42d82ed36852c544cb2"),
    achievementId: "test_rookie",
    title: "🏆 Test Rookie",
    description: "Complete your first test. (Welcome to the grind!)",
    category: "global",
    criteria: { testCount: 1 }
  },
  {
    _id: ObjectId("679ef42d82ed36852c544cb3"),
    achievementId: "accuracy_king",
    title: "🎯 Accuracy King",
    description: "Score 90% or higher on any test. (Are you even human?!)",
    category: "global",
    criteria: { minScore: 90 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cb4"),
    achievementId: "bronze_grinder",
    title: "🏅 Bronze Grinder",
    description: "Complete 10 tests. (You’re putting in the work!)",
    category: "global",
    criteria: { testCount: 10 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cb5"),
    achievementId: "silver_scholar",
    title: "🥈 Silver Scholar",
    description: "Complete 25 tests. (Starting to look like a pro!)",
    category: "global",
    criteria: { testCount: 25 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cb6"),
    achievementId: "gold_god",
    title: "🥇 Gold God",
    description: "Complete 50 tests. (Unstoppable!)",
    category: "global",
    criteria: { testCount: 50 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cb7"),
    achievementId: "platinum_pro",
    title: "💎 Platinum Pro",
    description: "Complete 80 tests. (No life, just tests!)",
    category: "global",
    criteria: { testCount: 80 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cb8"),
    achievementId: "walking_encyclopedia",
    title: "📚 Walking Encyclopedia",
    description: "Complete all 8,000 questions at least once. (You literally KNOW EVERYTHING.)",
    category: "global",
    criteria: { totalQuestions: 8000 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cb9"),
    achievementId: "redemption_arc",
    title: "🔄 Redemption Arc",
    description: "Score 40% or lower on a test, then retake and score 90%+. (A true comeback story!)",
    category: "global",
    criteria: { minScoreBefore: 40, minScoreAfter: 90 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cba"),
    achievementId: "memory_master",
    title: "🧠 Memory Master",
    description: "Get 5 perfect scores in a row. (Your brain is on fire!)",
    category: "global",
    criteria: { consecutivePerfects: 5 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cbb"),
    achievementId: "coin_collector_5000",
    title: "💰 Coin Collector (5,000 Coins)",
    description: "Earn 5,000 coins from correct answers. (Keep stacking!)",
    category: "global",
    criteria: { coins: 5000 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cbc"),
    achievementId: "coin_hoarder_10000",
    title: "💰 Coin Hoarder (10,000 Coins)",
    description: "Earn 10,000 coins from correct answers. (You're practically printing money.)",
    category: "global",
    criteria: { coins: 10000 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cbd"),
    achievementId: "coin_tycoon_50000",
    title: "💰 Coin Tycoon (50,000 Coins)",
    description: "Earn 50,000 coins from correct answers. (You own the leaderboard now!)",
    category: "global",
    criteria: { coins: 50000 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cbe"),
    achievementId: "perfectionist_1",
    title: "✅ Perfection (1 Test)",
    description: "Score 100% on a test. (One down, many to go!)",
    category: "global",
    criteria: { perfectTests: 1 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cbf"),
    achievementId: "double_trouble_2",
    title: "✅ Double Trouble (2 Tests)",
    description: "Score 100% on two different tests. (You're on a roll!)",
    category: "global",
    criteria: { perfectTests: 2 }
  },
  {
    _id: ObjectId("679ef42e82ed36852c544cc0"),
    achievementId: "error404_failure_not_found",
    title: "✅ Error 404 - Failure Not Found (3 Tests)",
    description: "Score 100% on three different tests. (Perfection is your middle name!)",
    category: "global",
    criteria: { perfectTests: 3 }
  },
  {
    _id: ObjectId("679f10a682ed36852c544cc1"),
    achievementId: "level_up_5",
    title: "🎚 Level Up! (Level 5)",
    description: "Reach Level 5. (Just getting started!)",
    category: "global",
    criteria: { level: 5 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc2"),
    achievementId: "mid_tier_grinder_25",
    title: "⚡ Mid-Tier Grinder (Level 25)",
    description: "Reach Level 25. (You're in deep now!)",
    category: "global",
    criteria: { level: 25 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc3"),
    achievementId: "elite_scholar_50",
    title: "🔥 Elite Scholar (Level 50)",
    description: "Reach Level 50. (You're a force to be reckoned with!)",
    category: "global",
    criteria: { level: 50 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc4"),
    achievementId: "ultimate_master_100",
    title: "👑 The Ultimate Master (Level 100)",
    description: "Reach Level 100. (You have ascended beyond mere mortals!)",
    category: "global",
    criteria: { level: 100 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc5"),
    achievementId: "category_perfectionist",
    title: "✅ Category Perfection",
    description: "Score 100% on all 10 tests in one exam category. (Master of a subject!)",
    category: "global",
    criteria: { perfectTestsInCategory: 10 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc6"),
    achievementId: "absolute_perfectionist",
    title: "✅ Absolute Perfection",
    description: "Score 100% on all tests in the entire platform. (The GOAT of test-taking!)",
    category: "global",
    criteria: { perfectTestsGlobal: true }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc7"),
    achievementId: "exam_conqueror",
    title: "🎖 Exam Conqueror (80% on All Tests)",
    description: "Score 80% or higher on every test in the platform. (No question is too hard for you!)",
    category: "global",
    criteria: { minScoreGlobal: 80 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc8"),
    achievementId: "subject_specialist",
    title: "🎖 Subject Specialist (80% in One Category)",
    description: "Score 80% or higher on all 10 tests in an exam category. (Master of one, instead of jack of all!)",
    category: "global",
    criteria: { minScoreInCategory: 80 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cc9"),
    achievementId: "answer_machine_1000",
    title: "📝 Answer Machine (1,000 Questions)",
    description: "Answer 1,000 questions in total. (No stopping now!)",
    category: "global",
    criteria: { totalQuestions: 1000 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544cca"),
    achievementId: "knowledge_beast_5000",
    title: "📝 Knowledge Beast (5,000 Questions)",
    description: "Answer 5,000 questions in total. (You're built different.)",
    category: "global",
    criteria: { totalQuestions: 5000 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544ccb"),
    achievementId: "question_terminator",
    title: "📝 Question Terminator (8,000 Questions)",
    description: "Answer all 10,000 questions in total. (Achievement unlocked: Cyber Overlord.)",
    category: "global",
    criteria: { totalQuestions: 10000 }
  },
  {
    _id: ObjectId("679f10a782ed36852c544ccc"),
    achievementId: "test_finisher",
    title: "✅ Test Finisher",
    description: "Complete all tests at least once, regardless of score. (Completionist vibes!)",
    category: "global",
    criteria: { allTestsCompleted: true }
  },
  {
    _id: ObjectId("679f10a782ed36852c544ccd"),
    achievementId: "subject_finisher",
    title: "✅ Subject Finisher",
    description: "Complete all 10 tests in a category at least once, regardless of score. (Master of consistency!)",
    category: "global",
    criteria: { testsCompletedInCategory: 10 }
  }
]);
