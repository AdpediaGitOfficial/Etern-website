/**
 * Interactive activity definitions. Every activity here is fully playable —
 * no placeholder buttons. Content will move to the database in the backend
 * phase; the player components read this shape either way.
 */

export const ACTIVITIES = [
  {
    slug: "find-the-red-circle",
    title: "Find the Red Circle",
    description: "Spot the right colour among four shapes.",
    longDescription:
      "A first colour-recognition activity. The child hears one colour name and finds it among four options — the simplest possible version of listen, look, decide.",
    engine: "choice",
    activityType: "colors",
    category: "Colors",
    ageMin: 3,
    ageMax: 5,
    difficulty: "Easy",
    points: 10,
    skills: ["Colour recognition", "Listening", "Focus"],
    emoji: "🔴",
    accent: "coral",
    featuredOnHome: true,
    rounds: [
      {
        prompt: "Can you find the red circle?",
        options: [
          { id: "blue", display: "●", label: "Blue circle", swatch: "sky" },
          { id: "yellow", display: "●", label: "Yellow circle", swatch: "sun" },
          { id: "red", display: "●", label: "Red circle", swatch: "coral", correct: true },
          { id: "green", display: "●", label: "Green circle", swatch: "leaf" },
        ],
      },
      {
        prompt: "Now find the green circle.",
        options: [
          { id: "green", display: "●", label: "Green circle", swatch: "leaf", correct: true },
          { id: "red", display: "●", label: "Red circle", swatch: "coral" },
          { id: "blue", display: "●", label: "Blue circle", swatch: "sky" },
          { id: "yellow", display: "●", label: "Yellow circle", swatch: "sun" },
        ],
      },
      {
        prompt: "Last one — find the yellow circle.",
        options: [
          { id: "blue", display: "●", label: "Blue circle", swatch: "sky" },
          { id: "yellow", display: "●", label: "Yellow circle", swatch: "sun", correct: true },
          { id: "green", display: "●", label: "Green circle", swatch: "leaf" },
          { id: "teal", display: "●", label: "Teal circle", swatch: "primary" },
        ],
      },
    ],
  },
  {
    slug: "count-the-stars",
    title: "Count the Stars",
    description: "Count what you see and pick the right number.",
    longDescription:
      "Counting with meaning. The child counts a group of objects and matches it to a numeral, building one-to-one correspondence rather than rote chanting.",
    engine: "choice",
    activityType: "counting",
    category: "Counting",
    ageMin: 4,
    ageMax: 6,
    difficulty: "Easy",
    points: 15,
    skills: ["Early numeracy", "One-to-one matching", "Counting"],
    emoji: "⭐",
    accent: "sun",
    featuredOnHome: true,
    rounds: [
      {
        prompt: "How many stars? ⭐⭐⭐",
        options: [
          { id: "2", display: "2", label: "Two" },
          { id: "3", display: "3", label: "Three", correct: true },
          { id: "4", display: "4", label: "Four" },
          { id: "5", display: "5", label: "Five" },
        ],
      },
      {
        prompt: "How many apples? 🍎🍎🍎🍎🍎",
        options: [
          { id: "4", display: "4", label: "Four" },
          { id: "6", display: "6", label: "Six" },
          { id: "5", display: "5", label: "Five", correct: true },
          { id: "3", display: "3", label: "Three" },
        ],
      },
      {
        prompt: "How many fish? 🐟🐟",
        options: [
          { id: "2", display: "2", label: "Two", correct: true },
          { id: "1", display: "1", label: "One" },
          { id: "3", display: "3", label: "Three" },
          { id: "4", display: "4", label: "Four" },
        ],
      },
    ],
  },
  {
    slug: "match-the-shapes",
    title: "Match the Shapes",
    description: "Find the shape that matches the one shown.",
    longDescription:
      "Shape matching sharpens visual discrimination — the same skill a child later uses to tell b from d.",
    engine: "choice",
    activityType: "shapes",
    category: "Shapes",
    ageMin: 3,
    ageMax: 6,
    difficulty: "Easy",
    points: 15,
    skills: ["Shape recognition", "Visual discrimination", "Matching"],
    emoji: "🔷",
    accent: "sky",
    featuredOnHome: true,
    rounds: [
      {
        prompt: "Which one is a triangle?",
        options: [
          { id: "sq", display: "⬛", label: "Square" },
          { id: "tri", display: "🔺", label: "Triangle", correct: true },
          { id: "ci", display: "⚫", label: "Circle" },
          { id: "st", display: "⭐", label: "Star" },
        ],
      },
      {
        prompt: "Which one matches this? 🔷",
        options: [
          { id: "a", display: "🔶", label: "Orange diamond" },
          { id: "b", display: "🔷", label: "Blue diamond", correct: true },
          { id: "c", display: "🔺", label: "Triangle" },
          { id: "d", display: "⚪", label: "White circle" },
        ],
      },
      {
        prompt: "Which shape has no corners?",
        options: [
          { id: "a", display: "⬛", label: "Square" },
          { id: "b", display: "🔺", label: "Triangle" },
          { id: "c", display: "⚫", label: "Circle", correct: true },
          { id: "d", display: "🔶", label: "Diamond" },
        ],
      },
    ],
  },
  {
    slug: "find-the-letter",
    title: "Find the Letter",
    description: "Listen for the sound, then find the letter.",
    longDescription:
      "Letter-sound matching, one of the strongest early predictors of reading confidence.",
    engine: "choice",
    activityType: "letters",
    category: "Letters",
    ageMin: 4,
    ageMax: 7,
    difficulty: "Medium",
    points: 20,
    skills: ["Letter recognition", "Phonics", "Listening"],
    emoji: "🅰️",
    accent: "primary",
    featuredOnHome: true,
    rounds: [
      {
        prompt: "Which letter makes the 'mmm' sound, like in moon?",
        options: [
          { id: "s", display: "S", label: "Letter S" },
          { id: "m", display: "M", label: "Letter M", correct: true },
          { id: "a", display: "A", label: "Letter A" },
          { id: "t", display: "T", label: "Letter T" },
        ],
      },
      {
        prompt: "Which letter does 🐱 cat start with?",
        options: [
          { id: "c", display: "C", label: "Letter C", correct: true },
          { id: "k", display: "K", label: "Letter K" },
          { id: "o", display: "O", label: "Letter O" },
          { id: "d", display: "D", label: "Letter D" },
        ],
      },
      {
        prompt: "Which letter does ☀️ sun start with?",
        options: [
          { id: "z", display: "Z", label: "Letter Z" },
          { id: "n", display: "N", label: "Letter N" },
          { id: "s", display: "S", label: "Letter S", correct: true },
          { id: "u", display: "U", label: "Letter U" },
        ],
      },
    ],
  },
  {
    slug: "memory-match",
    title: "Memory Match",
    description: "Turn over the cards and remember where the pairs are.",
    longDescription:
      "Working memory and patience in one game. Children hold images in mind while planning their next move.",
    engine: "memory",
    activityType: "memory",
    category: "Memory",
    ageMin: 4,
    ageMax: 7,
    difficulty: "Medium",
    points: 25,
    skills: ["Working memory", "Concentration", "Patience"],
    emoji: "🧠",
    accent: "leaf",
    featuredOnHome: true,
    pairs: ["🐘", "🦊", "🐢", "🦜", "🐝", "🐬"],
  },
  {
    slug: "animal-sound-hunt",
    title: "Animal Sound Hunt",
    description: "Match each sound to the animal that makes it.",
    longDescription: "Listening and vocabulary practice built around animals children already love.",
    engine: "choice",
    activityType: "matching",
    category: "Matching",
    ageMin: 3,
    ageMax: 5,
    difficulty: "Easy",
    points: 15,
    skills: ["Listening", "Vocabulary", "Matching"],
    emoji: "🦁",
    accent: "sun",
    rounds: [
      {
        prompt: "Who says 'moo'?",
        options: [
          { id: "cow", display: "🐄", label: "Cow", correct: true },
          { id: "dog", display: "🐕", label: "Dog" },
          { id: "cat", display: "🐈", label: "Cat" },
          { id: "duck", display: "🦆", label: "Duck" },
        ],
      },
      {
        prompt: "Who says 'quack'?",
        options: [
          { id: "sheep", display: "🐑", label: "Sheep" },
          { id: "duck", display: "🦆", label: "Duck", correct: true },
          { id: "frog", display: "🐸", label: "Frog" },
          { id: "bird", display: "🐦", label: "Bird" },
        ],
      },
      {
        prompt: "Who roars?",
        options: [
          { id: "mouse", display: "🐭", label: "Mouse" },
          { id: "fish", display: "🐟", label: "Fish" },
          { id: "lion", display: "🦁", label: "Lion", correct: true },
          { id: "bee", display: "🐝", label: "Bee" },
        ],
      },
    ],
  },
  {
    slug: "big-feelings",
    title: "Name the Feeling",
    description: "Look at the face and choose the feeling word.",
    longDescription:
      "Emotional literacy practice. Giving a feeling a name is the first step to managing it.",
    engine: "choice",
    activityType: "storytelling",
    category: "Storytelling",
    ageMin: 4,
    ageMax: 7,
    difficulty: "Medium",
    points: 20,
    skills: ["Emotional literacy", "Empathy", "Vocabulary"],
    emoji: "😊",
    accent: "coral",
    rounds: [
      {
        prompt: "Maya's ice cream fell on the floor. How does she feel? 😢",
        options: [
          { id: "sad", display: "Sad", label: "Sad", correct: true },
          { id: "excited", display: "Excited", label: "Excited" },
          { id: "sleepy", display: "Sleepy", label: "Sleepy" },
          { id: "proud", display: "Proud", label: "Proud" },
        ],
      },
      {
        prompt: "Arjun finished his tower all by himself. How does he feel? 😄",
        options: [
          { id: "scared", display: "Scared", label: "Scared" },
          { id: "proud", display: "Proud", label: "Proud", correct: true },
          { id: "angry", display: "Angry", label: "Angry" },
          { id: "shy", display: "Shy", label: "Shy" },
        ],
      },
      {
        prompt: "Someone took Leo's crayon without asking. How does he feel? 😠",
        options: [
          { id: "happy", display: "Happy", label: "Happy" },
          { id: "calm", display: "Calm", label: "Calm" },
          { id: "annoyed", display: "Annoyed", label: "Annoyed", correct: true },
          { id: "tired", display: "Tired", label: "Tired" },
        ],
      },
    ],
  },
  {
    slug: "what-comes-next",
    title: "What Comes Next?",
    description: "Finish the pattern with the right piece.",
    longDescription:
      "Pattern completion is early logical thinking — noticing a rule and applying it.",
    engine: "choice",
    activityType: "matching",
    category: "Problem solving",
    ageMin: 4,
    ageMax: 7,
    difficulty: "Challenge",
    points: 25,
    skills: ["Patterns", "Logic", "Prediction"],
    emoji: "🧩",
    accent: "primary",
    rounds: [
      {
        prompt: "🔺 ⚫ 🔺 ⚫ 🔺 … what comes next?",
        options: [
          { id: "a", display: "⚫", label: "Circle", correct: true },
          { id: "b", display: "🔺", label: "Triangle" },
          { id: "c", display: "⭐", label: "Star" },
          { id: "d", display: "🔷", label: "Diamond" },
        ],
      },
      {
        prompt: "🍎 🍎 🍌 🍎 🍎 … what comes next?",
        options: [
          { id: "a", display: "🍎", label: "Apple" },
          { id: "b", display: "🍌", label: "Banana", correct: true },
          { id: "c", display: "🍇", label: "Grapes" },
          { id: "d", display: "🍊", label: "Orange" },
        ],
      },
      {
        prompt: "1, 2, 3, 4 … what comes next?",
        options: [
          { id: "a", display: "6", label: "Six" },
          { id: "b", display: "3", label: "Three" },
          { id: "c", display: "5", label: "Five", correct: true },
          { id: "d", display: "7", label: "Seven" },
        ],
      },
    ],
  },
  {
    slug: "colour-mixing-lab",
    title: "Colour Mixing Lab",
    description: "Guess what happens when two colours meet.",
    longDescription:
      "Creative reasoning and colour theory in its simplest form — a favourite before a painting session.",
    engine: "choice",
    activityType: "creative",
    category: "Creativity",
    ageMin: 5,
    ageMax: 7,
    difficulty: "Challenge",
    points: 25,
    skills: ["Colour theory", "Prediction", "Creative thinking"],
    emoji: "🎨",
    accent: "coral",
    rounds: [
      {
        prompt: "Blue 💙 + Yellow 💛 makes…",
        options: [
          { id: "a", display: "Green", label: "Green", correct: true },
          { id: "b", display: "Purple", label: "Purple" },
          { id: "c", display: "Orange", label: "Orange" },
          { id: "d", display: "Brown", label: "Brown" },
        ],
      },
      {
        prompt: "Red ❤️ + Yellow 💛 makes…",
        options: [
          { id: "a", display: "Green", label: "Green" },
          { id: "b", display: "Orange", label: "Orange", correct: true },
          { id: "c", display: "Blue", label: "Blue" },
          { id: "d", display: "Pink", label: "Pink" },
        ],
      },
      {
        prompt: "Red ❤️ + Blue 💙 makes…",
        options: [
          { id: "a", display: "Yellow", label: "Yellow" },
          { id: "b", display: "Grey", label: "Grey" },
          { id: "c", display: "Purple", label: "Purple", correct: true },
          { id: "d", display: "Green", label: "Green" },
        ],
      },
    ],
  },
];

export const ACTIVITY_CATEGORIES = [
  "Colors",
  "Shapes",
  "Counting",
  "Letters",
  "Memory",
  "Matching",
  "Creativity",
  "Storytelling",
  "Problem solving",
];

export const getActivity = (slug) => ACTIVITIES.find((a) => a.slug === slug);
