
export const jobRoles = [
  { id: "1", title: "Frontend Developer" },
  { id: "2", title: "Backend Developer" },
  { id: "3", title: "Full Stack Developer" },
  { id: "4", title: "UX/UI Designer" },
  { id: "5", title: "Product Manager" },
  { id: "6", title: "Data Scientist" },
  { id: "7", title: "DevOps Engineer" },
  { id: "8", title: "Marketing Specialist" }
];

export const difficultyLevels = [
  { id: "1", label: "Beginner" },
  { id: "2", label: "Intermediate" },
  { id: "3", label: "Advanced" }
];

export const sampleQuestions = {
  "Frontend Developer": [
    "Explain the difference between let, const, and var in JavaScript.",
    "How does React's virtual DOM work?",
    "Describe how you would implement responsive design.",
    "What are React hooks and how do they work?",
    "Explain CSS specificity and the box model."
  ],
  "Product Manager": [
    "How do you prioritize features in a product roadmap?",
    "Describe your process for gathering user requirements.",
    "How do you measure the success of a product feature?",
    "Tell me about a time when you had to make a difficult product decision.",
    "How do you balance business needs with user needs?"
  ],
  "Data Scientist": [
    "Explain the difference between supervised and unsupervised learning.",
    "How would you handle missing data in a dataset?",
    "Describe a situation where you used data to solve a business problem.",
    "Explain the concept of overfitting and how to prevent it.",
    "What evaluation metrics would you use for a classification problem?"
  ]
};

// Sample feedback responses
export const sampleFeedback = {
  "positive": [
    "Great answer! You effectively demonstrated your knowledge.",
    "Well articulated response with clear examples.",
    "You addressed all key aspects of the question competently.",
    "Strong technical explanation that shows your expertise."
  ],
  "negative": [
    "Consider providing more specific examples in your answer.",
    "Try to be more concise while covering the key points.",
    "Make sure to address all parts of the question completely.",
    "Consider structuring your answer with a clear beginning and conclusion."
  ]
};
