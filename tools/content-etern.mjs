/**
 * Etern Learning content source.
 *
 * The single place page copy lives. Programs, testimonials, contact details
 * and journal posts are edited here, then `node tools/build.mjs` regenerates
 * the HTML. Entries marked `placeholder: true` are sample copy waiting to be
 * replaced with the real thing.
 */

export const BRAND = {
  name: "Etern Learning",
  description:
    "Etern Learning creates meaningful early-learning experiences for children aged 3–7, blending creativity, academic foundation, emotional development and safety education into short guided sessions children love to follow.",
  phone: "+91 6282 21 8100",
  phoneHref: "tel:+916282218100",
  whatsapp: "https://wa.me/916282218100",
  email: "info@eternlearning.com",
  address:
    "Etern Learning Private Limited, 1st Floor, SA Plaza, Vivekananda Road, Vennala PO, Kochi – 682028",
  social: {
    instagram: "https://www.instagram.com/eternlearning",
    facebook: "https://www.facebook.com/share/1DvyjpBHXf/",
    linkedin: "https://www.linkedin.com/company/etern-learning/",
    youtube: "https://youtube.com/@eternlearning",
  },
  apps: {
    ios: "https://apps.apple.com/in/app/etern-learning/id6743792956",
    android: "https://play.google.com/store/apps/details?id=com.eternlearning",
  },
};

export const PROGRAMS = [
  {
    slug: "creative-skill-development",
    title: "Creative Skill Development",
    shortDescription:
      "Nurturing imagination and problem-solving through fun activities that help children express themselves and build confidence.",
    description:
      "Music, dance, art, craft and storytelling come together in short guided sessions. Children follow along on screen, then create something real off screen — the drawing, the model, the little song they made up. Creative confidence grows from finishing something that is truly theirs.",
    category: "Creativity",
    ageMin: 3,
    ageMax: 7,
    icon: "palette",
    skills: ["Imagination", "Fine motor skills", "Self-expression", "Problem solving", "Focus"],
    outcomes: [
      "Expresses ideas through drawing, movement and music",
      "Completes a creative task from start to finish",
      "Tries a second approach when the first one does not work",
      "Talks about their own work with pride",
    ],
    featured: true,
  },
  {
    slug: "academic-foundation",
    title: "Academic Foundation",
    shortDescription:
      "Supporting children in building a strong base for lifelong learning, encouraging early understanding without any academic pressure.",
    description:
      "Letters, sounds, numbers, shapes and patterns introduced the way young children actually learn — through play, repetition and real objects around the house. No worksheets, no pressure, no rushing ahead of the child.",
    category: "Academics",
    ageMin: 3,
    ageMax: 7,
    icon: "book-open",
    skills: [
      "Letter recognition",
      "Early numeracy",
      "Shapes & patterns",
      "Listening",
      "Pre-writing",
    ],
    outcomes: [
      "Recognises letters and their sounds",
      "Counts with meaning, not just by memory",
      "Sorts, matches and completes simple patterns",
      "Approaches new concepts with curiosity instead of fear",
    ],
    featured: true,
  },
  {
    slug: "social-emotional-growth",
    title: "Social-Emotional Growth",
    shortDescription:
      "Helping children manage emotions, communicate effectively, and develop empathy and self-confidence.",
    description:
      "Stories and role-play give children the words for big feelings. Sessions cover naming emotions, waiting for a turn, saying sorry, helping a friend and asking for help — the skills that decide how school actually feels for a child.",
    category: "Emotional skills",
    ageMin: 3,
    ageMax: 7,
    icon: "heart-handshake",
    skills: ["Emotional literacy", "Empathy", "Communication", "Sharing", "Confidence"],
    outcomes: [
      "Names what they are feeling instead of acting it out",
      "Listens and responds in a conversation",
      "Shares and takes turns with less prompting",
      "Recovers from small setbacks more calmly",
    ],
    featured: true,
  },
  {
    slug: "safety-and-wellbeing",
    title: "Safety & Wellbeing",
    shortDescription:
      "Teaching safety awareness, body confidence, and healthy habits to help children stay aware, safe, and cared for.",
    description:
      "Calm, age-appropriate lessons on personal safety, safe and unsafe touch, trusted adults, road and home safety, hygiene and healthy routines. Delivered gently, so children feel capable rather than frightened.",
    category: "Wellbeing",
    ageMin: 3,
    ageMax: 7,
    icon: "shield-check",
    skills: ["Body safety", "Trusted adults", "Healthy habits", "Awareness", "Speaking up"],
    outcomes: [
      "Knows their trusted adults and how to reach them",
      "Understands safe and unsafe touch in simple language",
      "Follows everyday safety rules at home and outdoors",
      "Builds independent hygiene and sleep routines",
    ],
    featured: true,
  },
];

export const AGE_STAGES = [
  {
    id: "discover",
    ageLabel: "3–4",
    stage: "Discover",
    headline: "Everything is new, and that is the point.",
    description:
      "Very short sessions built around sound, colour, movement and naming the world. Success at this stage is joyful attention, not output.",
    skills: ["Colours", "Sounds", "Big movements", "First words", "Following along"],
    objectives: [
      "Sit with a short guided activity from start to finish",
      "Name everyday colours, shapes and sounds",
      "Copy simple movements and rhythms",
    ],
    sampleLessons: ["Find the Red Circle", "Animal Sound Hunt", "Clap the Rhythm"],
    parentBenefit: "Five focused minutes a day that end in a real off-screen activity.",
    recommendedPrograms: ["creative-skill-development", "safety-and-wellbeing"],
  },
  {
    id: "explore",
    ageLabel: "4–5",
    stage: "Explore",
    headline: "Questions arrive faster than answers.",
    description:
      "Children start connecting ideas: letters make sounds, numbers mean quantity, feelings have names. Sessions get slightly longer and more hands-on.",
    skills: ["Letter sounds", "Counting to 20", "Patterns", "Naming feelings", "Turn-taking"],
    objectives: [
      "Match letters to their sounds",
      "Count objects accurately with one-to-one matching",
      "Describe how a character in a story feels",
    ],
    sampleLessons: ["Letter Sound Safari", "Count the Stars", "How Does Maya Feel?"],
    parentBenefit: "Clear weekly view of which skills are clicking and which need repetition.",
    recommendedPrograms: ["academic-foundation", "social-emotional-growth"],
  },
  {
    id: "build",
    ageLabel: "5–6",
    stage: "Build",
    headline: "From recognising to actually doing.",
    description:
      "Blending sounds into words, adding and taking away, planning a drawing before starting it. Children begin to work on something across several days.",
    skills: ["Blending sounds", "Simple addition", "Sequencing", "Storytelling", "Persistence"],
    objectives: [
      "Blend three-letter words independently",
      "Solve simple add and take-away problems with objects",
      "Retell a story in the right order",
    ],
    sampleLessons: ["Build a Word", "Shape Builders", "Tell It Again"],
    parentBenefit: "Progress tracking that shows growth over weeks, not just today's score.",
    recommendedPrograms: ["academic-foundation", "creative-skill-development"],
  },
  {
    id: "grow",
    ageLabel: "6–7",
    stage: "Grow",
    headline: "Confidence becomes the real subject.",
    description:
      "Longer projects, reading short passages, explaining their thinking, handling disagreements and taking responsibility for their own safety and routines.",
    skills: ["Early reading", "Explaining thinking", "Collaboration", "Independence", "Safety"],
    objectives: [
      "Read and understand a short passage",
      "Explain how they solved a problem",
      "Complete a multi-step project independently",
    ],
    sampleLessons: ["Read & Retell", "My Own Comic Strip", "My Trusted Adults"],
    parentBenefit: "A learning history you can actually show a teacher.",
    recommendedPrograms: ["social-emotional-growth", "safety-and-wellbeing"],
  },
];

export const METHOD_STEPS = [
  {
    number: "01",
    title: "Curious",
    description:
      "Every session opens with something worth wondering about — a sound, a question, a small mystery.",
    outcome: "Attention given freely, not demanded.",
  },
  {
    number: "02",
    title: "Explore",
    description:
      "Children investigate with their hands and their voice, using objects already in the house.",
    outcome: "Understanding built from real experience.",
  },
  {
    number: "03",
    title: "Create",
    description: "They make something: a drawing, a model, a rhythm, a short story of their own.",
    outcome: "A finished piece of work they are proud of.",
  },
  {
    number: "04",
    title: "Communicate",
    description: "They show it and talk about it — what they made, why, and what was tricky.",
    outcome: "Language and confidence, together.",
  },
  {
    number: "05",
    title: "Grow",
    description: "Skills are revisited across weeks so learning settles instead of disappearing.",
    outcome: "Steady, visible progress over time.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    id: "watch",
    title: "Watch",
    description: "A short guided lesson, calm pacing, no noisy distractions.",
    detail: "5–8 minutes of screen time, designed to end cleanly.",
    icon: "play-circle",
  },
  {
    id: "do",
    title: "Do",
    description: "The screen goes away and the activity begins with real objects.",
    detail: "Everything needed is usually already at home.",
    icon: "hand",
  },
  {
    id: "create",
    title: "Create",
    description: "The child makes something of their own from the idea they just learned.",
    detail: "Drawing, building, moving, storytelling.",
    icon: "sparkles",
  },
  {
    id: "share",
    title: "Share",
    description: "They show a parent and explain it — the step that locks the learning in.",
    detail: "Parents see the work, not just a completion tick.",
    icon: "users",
  },
];

export const TESTIMONIALS = [
  {
    id: "nasmi",
    parentName: "Nasmi VI",
    role: "Parent",
    childAge: "3 years",
    quote:
      "This is one of the best apps for my 3-year-old. We've seen a huge improvement in her creativity and focus. It's engaging, fun, and very easy for kids to use. What impressed us most is how it helped us discover her talent in drawing. Highly recommended for parents looking to support their child's development in a meaningful way.",
    rating: 5,
    featured: true,
  },
  {
    id: "brinet",
    parentName: "Brinet Louis",
    role: "Parent",
    quote:
      "This is more than just an app — it's a complete foundation for kids' development. Etern Learning deserves all the appreciation.",
    rating: 5,
    featured: true,
  },
  {
    id: "anas",
    parentName: "Anas MS",
    role: "Parent",
    quote:
      "Initially I wasn't fully confident, but after one month I've seen a drastic change in my son's behavior. I'm truly happy with the program and its positive impact. Highly recommended!",
    rating: 5,
    featured: true,
  },
  {
    id: "sarath",
    parentName: "Sarath R",
    role: "Parent",
    quote:
      "As a parent, I wanted something meaningful and safe for my kids online. Etern Learning gave us exactly that — learning with values. Highly satisfied.",
    rating: 5,
    featured: true,
  },
];

export const JOURNAL_POSTS = [
  {
    slug: "early-learning-apps-child-development-ages-3-7",
    image: "blog-1",
    imageAlt:
      "A child sitting with a tablet, surrounded by icons for thinking, looking and rewards.",
    title: "How Early Learning Apps Improve Child Development at Ages 3–7",
    excerpt:
      "Used well, a short guided session can build attention, vocabulary and confidence. Used badly, it is just screen time. Here is the difference.",
    category: "Learning",
    author: "Etern Learning",
    date: "2026-01-21",
    readingMinutes: 6,
    featured: true,
    placeholder: true,
    body: [
      "Between the ages of three and seven, children build the habits that decide how school feels for them later: how long they can hold attention, how they react when something is hard, how many words they have to describe what they think.",
      "A learning app helps only when it respects those habits. That means short sessions, one idea at a time, and a clear ending that sends the child back into the real world with something to do.",
      "The test we apply to every Etern lesson is simple: after the screen goes off, is the child doing something? If the answer is no, the lesson is not finished.",
      "Look for three things in any early-learning app: a defined stopping point, an off-screen activity, and visibility for the parent. Everything else is decoration.",
    ],
  },
  {
    slug: "why-activity-based-learning-helps-children-learn-faster",
    image: "blog-2",
    imageAlt:
      "A parent and child building a tower from wooden blocks together at a table.",
    title: "Why Activity-Based Learning Helps Children Learn Faster",
    excerpt:
      "Young children understand with their hands first. Activity-based learning turns an abstract idea into something they can hold.",
    category: "Child Development",
    author: "Etern Learning",
    date: "2026-01-21",
    readingMinutes: 5,
    featured: false,
    placeholder: true,
    body: [
      "Ask a four-year-old what three means and you will often get a shrug. Ask them to bring you three spoons and they will do it without hesitating.",
      "That gap is the whole argument for activity-based learning. The concept becomes real once the child moves, sorts, builds or counts something physical.",
      "Activity also gives repetition without boredom. The same skill can appear as a hunt, a sorting game, a drawing and a story across one week.",
      "Practically: pick one skill per week, then find four different physical ways to meet it. Depth beats novelty at this age.",
    ],
  },
  {
    slug: "science-behind-visual-learning-why-kids-understand-better",
    image: "blog-3",
    imageAlt:
      "A child holding up a picture card, with matching cards laid out on the desk.",
    title: "The Science Behind Visual Learning and Why Kids Understand Better",
    excerpt:
      "Children process images long before they decode words. Visual sequencing is why a well-made lesson lands in seconds.",
    category: "Learning",
    author: "Etern Learning",
    date: "2026-01-21",
    readingMinutes: 5,
    featured: false,
    placeholder: true,
    body: [
      "Before reading arrives, images do the heavy lifting. A child can follow a visual sequence — first this, then that — long before they can follow the same instruction in a sentence.",
      "This is why our lessons show the finished result early, then break it into steps. The child knows where they are going, so each step feels achievable.",
      "Visuals also reduce the working-memory load. Fewer words to hold in mind means more attention available for the actual skill.",
      "At home, the same principle works: show, then narrate. Never narrate first.",
    ],
  },
  {
    slug: "screen-time-that-earns-its-place",
    title: "Screen Time That Earns Its Place",
    excerpt:
      "A practical framework for deciding which twenty minutes of screen time are worth it — and which are not.",
    category: "Parenting",
    author: "Etern Learning",
    date: "2026-02-04",
    readingMinutes: 4,
    featured: false,
    placeholder: true,
    body: [
      "The question is not how many minutes, but what happens when the minutes end. Screen time that produces an activity, a conversation or a creation has earned its place.",
      "Try this rule for a week: every session ends with the child showing you something. Anything that cannot pass that test gets cut.",
    ],
  },
  {
    slug: "teaching-body-safety-calmly",
    title: "Teaching Body Safety Without Making It Scary",
    excerpt:
      "Body safety works best as an ordinary, repeated conversation — not a single serious talk.",
    category: "Safety",
    author: "Etern Learning",
    date: "2026-02-18",
    readingMinutes: 5,
    featured: false,
    placeholder: true,
    body: [
      "Children absorb safety rules the same way they absorb road rules: through calm repetition in ordinary moments, not one dramatic conversation.",
      "Name the trusted adults out loud. Repeat them weekly. Keep the tone as normal as brushing teeth.",
    ],
  },
  {
    slug: "five-minute-creativity-prompts",
    title: "Five-Minute Creativity Prompts for Busy Evenings",
    excerpt: "Short creative prompts that need nothing more than paper, hands and two minutes.",
    category: "Activities",
    author: "Etern Learning",
    date: "2026-03-02",
    readingMinutes: 3,
    featured: false,
    placeholder: true,
    body: [
      "Draw an animal that does not exist and give it a job. Build the tallest tower using only three objects. Make up a sound for a feeling.",
      "The value is not the output. It is the child discovering their ideas are welcome.",
    ],
  },
];

export const JOURNAL_CATEGORIES = [
  "Parenting",
  "Activities",
  "Learning",
  "Child Development",
  "Safety",
  "Creativity",
];

export const VIDEOS = [
  {
    id: "colour-hunt",
    title: "Colour Hunt Around the House",
    description: "A five-minute guided hunt that turns any room into a colour lesson.",
    category: "Activities",
    duration: "5:12",
    ageLabel: "3–4",
    featured: true,
    placeholder: true,
  },
  {
    id: "letter-sounds",
    title: "Letter Sounds: M, S and A",
    description: "First three sounds, introduced with movement and objects.",
    category: "Lessons",
    duration: "6:40",
    ageLabel: "4–5",
    featured: false,
    placeholder: true,
  },
  {
    id: "count-with-me",
    title: "Count With Me to Twenty",
    description: "Counting real objects with one-to-one matching, not rote chanting.",
    category: "Lessons",
    duration: "7:05",
    ageLabel: "4–5",
    featured: false,
    placeholder: true,
  },
  {
    id: "big-feelings",
    title: "Big Feelings, Small Words",
    description: "A short story that gives children language for anger and disappointment.",
    category: "Learning",
    duration: "8:18",
    ageLabel: "5–6",
    featured: true,
    placeholder: true,
  },
  {
    id: "paper-sculpture",
    title: "Make a Paper Sculpture",
    description: "Fold, cut and balance — fine motor practice disguised as art.",
    category: "Creative",
    duration: "9:30",
    ageLabel: "5–7",
    featured: false,
    placeholder: true,
  },
  {
    id: "trusted-adults",
    title: "My Trusted Adults",
    description: "Calm, age-appropriate personal safety with no fear attached.",
    category: "Safety",
    duration: "6:02",
    ageLabel: "4–7",
    featured: false,
    placeholder: true,
  },
  {
    id: "routines-that-stick",
    title: "Routines That Actually Stick",
    description: "For parents: building bedtime and morning routines without a battle.",
    category: "Parenting",
    duration: "11:24",
    ageLabel: "Parents",
    featured: false,
    placeholder: true,
  },
  {
    id: "shape-detectives",
    title: "Shape Detectives",
    description: "Spotting circles, squares and triangles in the real world.",
    category: "Activities",
    duration: "5:48",
    ageLabel: "3–5",
    featured: false,
    placeholder: true,
  },
];

export const VIDEO_CATEGORIES = [
  "Lessons",
  "Activities",
  "Parenting",
  "Creative",
  "Learning",
  "Safety",
];

export const FAQS = [
  {
    question: "What ages is Etern Learning designed for?",
    answer:
      "Etern Learning is built for children aged 3 to 7, with content organised into four stages: 3–4 Discover, 4–5 Explore, 5–6 Build and 6–7 Grow.",
    category: "Programs",
  },
  {
    question: "How much screen time does a session involve?",
    answer:
      "Each guided lesson is short and ends deliberately, then hands the child an off-screen activity. The screen is the instruction, not the experience.",
    category: "Screen time",
  },
  {
    question: "Do I need to buy special materials?",
    answer:
      "No. Activities are designed around objects most homes already have — paper, crayons, spoons, blocks, household items.",
    category: "Programs",
  },
  {
    question: "How involved does a parent need to be?",
    answer:
      "Younger children need an adult nearby for the off-screen activity. Older children can complete most sessions independently and then share the result.",
    category: "Parents",
  },
  {
    question: "Is there an app?",
    answer:
      "Yes. Etern Learning is available on both the App Store and Google Play, and the web platform keeps everything in sync.",
    category: "General",
  },
  {
    question: "What happens in a free demo session?",
    answer:
      "A member of the Etern team walks you through the programs, matches your child's stage and answers questions. There is no obligation to continue.",
    category: "Demo",
  },
];

export const DEMO_INTERESTS = [
  "Creativity",
  "Academic Foundation",
  "Communication",
  "Confidence",
  "Social Skills",
  "Life Skills",
];
