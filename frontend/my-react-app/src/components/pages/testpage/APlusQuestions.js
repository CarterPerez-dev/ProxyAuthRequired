// components/APlusQuestions.js
export const aplusQuestionsData = [
  {
    testId: 1,
    testName: "A+ Practice Test 1",
    xpPerCorrect: 10,
    questions: [
      {
        id: 1,
        question: "Which part supplies power to a PC’s internal components?",
        options: ["Motherboard", "PSU", "RAM", "GPU"],
        correctAnswerIndex: 1,
        explanation: "A PSU converts AC to low-voltage DC for the computer."
      },
      {
        id: 2,
        question: "What does BIOS/UEFI primarily do?",
        options: [
          "Manages OS file systems",
          "Facilitates I/O and boots the OS",
          "Only handles user security",
          "Provides OS-level APIs"
        ],
        correctAnswerIndex: 1,
        explanation: "BIOS/UEFI initializes hardware and loads the bootloader."
      }
      // ... up to 100 questions ...
    ]
  },
  {
    testId: 2,
    testName: "A+ Practice Test 2",
    xpPerCorrect: 15,
    questions: [
      // 100 questions...
    ]
  },
  // ... up to testId = 10 ...
];

