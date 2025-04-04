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

// Add a mock data for scoring
export const mockInterviewScoreData = {
  technicalKnowledge: {
    excellent: "Your technical knowledge is impressive. You demonstrated deep understanding of the subject matter and were able to explain complex concepts clearly.",
    good: "You showed good technical knowledge. Consider deepening your understanding in some specific areas to excel further.",
    needs_improvement: "Work on strengthening your technical knowledge. Focus on understanding core concepts and being able to explain them clearly."
  },
  communicationSkills: {
    excellent: "Your communication skills are excellent. You articulated your thoughts clearly and concisely.",
    good: "You communicated well during the interview. Continue to practice presenting complex ideas in a structured manner.",
    needs_improvement: "Focus on improving how you structure and deliver your answers. Practice speaking concisely and clearly."
  },
  problemSolving: {
    excellent: "Your problem-solving approach was methodical and effective. You broke down complex problems and approached them systematically.",
    good: "You showed good problem-solving skills. Continue to practice thinking aloud and explaining your approach.",
    needs_improvement: "Work on developing a more structured approach to problem-solving. Break down problems step by step and explain your thought process."
  },
  cultureFit: {
    excellent: "You demonstrated strong alignment with the company culture and values through your responses and approach.",
    good: "Your responses showed good understanding of company culture and values. Continue to research and align your experience with company expectations.",
    needs_improvement: "Research more about company values and how your experience aligns with their culture. Prepare specific examples that showcase this alignment."
  }
};

// Add more specific role questions
export function getDifficultyQuestions(role: string, difficulty: string) {
  // This would be expanded with real data
  const roleDifficultyMap: {[key: string]: {[key: string]: string[]}} = {
    "Frontend Developer": {
      "Beginner": [
        "What is the difference between let, const, and var in JavaScript?",
        "Explain the box model in CSS.",
        "What is responsive design and how do you implement it?",
        "What are semantic HTML tags and why are they important?",
        "How do you center an element horizontally and vertically using CSS?"
      ],
      "Intermediate": [
        "Explain how React's virtual DOM works and its benefits.",
        "What are React hooks? Give examples of when you would use useState and useEffect.",
        "Explain the concept of CSS-in-JS and its advantages/disadvantages.",
        "What is code splitting and why is it important in modern web applications?",
        "How do you optimize website performance on the front end?"
      ],
      "Advanced": [
        "Compare and contrast different state management solutions in React (Context API, Redux, MobX, etc.).",
        "Explain your approach to writing accessible and inclusive front-end code.",
        "How would you implement a complex animation or transition in React?",
        "Describe your experience with micro-frontend architecture.",
        "How would you debug a memory leak in a React application?"
      ]
    },
    "Backend Developer": {
      "Beginner": [
        "What is RESTful API design?",
        "Explain the difference between SQL and NoSQL databases.",
        "What is middleware in the context of web applications?",
        "What are environment variables and why are they important?",
        "Explain the concept of CRUD operations."
      ],
      "Intermediate": [
        "How do you handle authentication and authorization in a web application?",
        "Explain the concept of database indexing and when to use it.",
        "What are microservices and what are their benefits and drawbacks?",
        "How do you handle error handling in a backend application?",
        "Explain the concept of database normalization."
      ],
      "Advanced": [
        "How would you design a system that needs to handle high traffic and ensure data integrity?",
        "Explain your approach to API versioning and backward compatibility.",
        "How do you implement effective caching strategies?",
        "Describe your experience with event-driven architecture.",
        "How would you design a scalable system that processes large amounts of data?"
      ]
    }
  };

  // Default to intermediate if difficulty not found
  const difficultyLevel = roleDifficultyMap[role]?.[difficulty] || 
                          roleDifficultyMap[role]?.["Intermediate"] || 
                          roleDifficultyMap["Frontend Developer"]["Intermediate"];

  return difficultyLevel;
}
