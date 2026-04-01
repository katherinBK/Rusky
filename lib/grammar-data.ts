export interface GrammarTopic {
  id: string
  title: string
  titleRu: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  lessons: GrammarLesson[]
}

export interface GrammarLesson {
  id: string
  title: string
  content: string
  examples: Array<{
    russian: string
    transliteration: string
    english: string
  }>
  exercises: GrammarExercise[]
}

export interface GrammarExercise {
  id: string
  type: "multiple-choice" | "fill-blank" | "translation"
  question: string
  questionRu?: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export const grammarTopics: GrammarTopic[] = [
  {
    id: "noun-cases",
    title: "Noun Cases",
    titleRu: "Падежи",
    description: "Learn the 6 Russian cases and how they change noun endings",
    difficulty: "intermediate",
    lessons: [
      {
        id: "nominative",
        title: "Nominative Case (Именительный)",
        content: "The nominative case is the basic form of a noun, used for subjects of sentences. This is the form you'll find in dictionaries.",
        examples: [
          { russian: "Кот спит.", transliteration: "Kot spit.", english: "The cat sleeps." },
          { russian: "Книга интересная.", transliteration: "Kniga interesnaya.", english: "The book is interesting." },
          { russian: "Мама готовит.", transliteration: "Mama gotovit.", english: "Mom is cooking." },
        ],
        exercises: [
          {
            id: "nom-1",
            type: "multiple-choice",
            question: "Which word is the subject (nominative) in: \"Собака бежит\"?",
            options: ["Собака", "бежит", "Both"],
            correctAnswer: "Собака",
            explanation: "Собака (dog) is the subject performing the action, so it's in nominative case.",
          },
          {
            id: "nom-2",
            type: "translation",
            question: "Translate to Russian: The student reads.",
            correctAnswer: "Студент читает.",
            explanation: "Студент is in nominative case as the subject of the sentence.",
          },
        ],
      },
      {
        id: "accusative",
        title: "Accusative Case (Винительный)",
        content: "The accusative case is used for direct objects - the thing receiving the action. Masculine inanimate and neuter nouns don't change, but feminine nouns ending in -а change to -у.",
        examples: [
          { russian: "Я читаю книгу.", transliteration: "Ya chitayu knigu.", english: "I read a book." },
          { russian: "Он видит кота.", transliteration: "On vidit kota.", english: "He sees the cat." },
          { russian: "Мы любим музыку.", transliteration: "My lyubim muzyku.", english: "We love music." },
        ],
        exercises: [
          {
            id: "acc-1",
            type: "fill-blank",
            question: "Я вижу _____ (мама).",
            correctAnswer: "маму",
            explanation: "Мама changes to маму in accusative case (direct object).",
          },
          {
            id: "acc-2",
            type: "multiple-choice",
            question: "What is the accusative form of \"книга\"?",
            options: ["книга", "книгу", "книге", "книгой"],
            correctAnswer: "книгу",
            explanation: "Feminine nouns ending in -а change to -у in accusative case.",
          },
        ],
      },
    ],
  },
  {
    id: "verb-aspects",
    title: "Verb Aspects",
    titleRu: "Виды глагола",
    description: "Understand perfective and imperfective verb aspects",
    difficulty: "intermediate",
    lessons: [
      {
        id: "imperfective",
        title: "Imperfective Aspect (Несовершенный вид)",
        content: "Imperfective verbs describe ongoing, repeated, or habitual actions. They focus on the process rather than completion.",
        examples: [
          { russian: "Я читал книгу.", transliteration: "Ya chital knigu.", english: "I was reading a book. (process)" },
          { russian: "Она часто готовит.", transliteration: "Ona chasto gotovit.", english: "She often cooks. (habitual)" },
          { russian: "Мы писали письма.", transliteration: "My pisali pisma.", english: "We were writing letters." },
        ],
        exercises: [
          {
            id: "imp-1",
            type: "multiple-choice",
            question: "Which sentence uses imperfective aspect?",
            options: ["Я прочитал книгу.", "Я читал книгу.", "Я прочитаю книгу."],
            correctAnswer: "Я читал книгу.",
            explanation: "Читал is imperfective, focusing on the process of reading, not completion.",
          },
        ],
      },
      {
        id: "perfective",
        title: "Perfective Aspect (Совершенный вид)",
        content: "Perfective verbs describe completed, one-time actions with a clear result. They focus on the outcome.",
        examples: [
          { russian: "Я прочитал книгу.", transliteration: "Ya prochital knigu.", english: "I read/finished the book." },
          { russian: "Она приготовила ужин.", transliteration: "Ona prigotovila uzhin.", english: "She cooked dinner. (completed)" },
          { russian: "Мы написали письмо.", transliteration: "My napisali pismo.", english: "We wrote a letter. (finished)" },
        ],
        exercises: [
          {
            id: "perf-1",
            type: "multiple-choice",
            question: "Which prefix often makes a verb perfective?",
            options: ["по-", "не-", "без-"],
            correctAnswer: "по-",
            explanation: "The prefix по- is commonly used to form perfective verbs (читать → почитать).",
          },
        ],
      },
    ],
  },
  {
    id: "adjective-agreement",
    title: "Adjective Agreement",
    titleRu: "Согласование прилагательных",
    description: "Learn how adjectives agree with nouns in gender, number, and case",
    difficulty: "beginner",
    lessons: [
      {
        id: "gender-agreement",
        title: "Gender Agreement",
        content: "Russian adjectives must match the gender of the noun they describe. Masculine adjectives typically end in -ый/-ий, feminine in -ая/-яя, and neuter in -ое/-ее.",
        examples: [
          { russian: "красивый дом", transliteration: "krasivyy dom", english: "beautiful house (m)" },
          { russian: "красивая книга", transliteration: "krasivaya kniga", english: "beautiful book (f)" },
          { russian: "красивое окно", transliteration: "krasivoye okno", english: "beautiful window (n)" },
        ],
        exercises: [
          {
            id: "adj-1",
            type: "fill-blank",
            question: "_____ машина (новый)",
            correctAnswer: "Новая",
            explanation: "Машина is feminine, so the adjective новый becomes новая.",
          },
          {
            id: "adj-2",
            type: "multiple-choice",
            question: "What is the neuter form of \"большой\" (big)?",
            options: ["большой", "большая", "большое", "большие"],
            correctAnswer: "большое",
            explanation: "Neuter adjectives end in -ое, so большой becomes большое.",
          },
        ],
      },
    ],
  },
  {
    id: "verb-conjugation",
    title: "Verb Conjugation",
    titleRu: "Спряжение глаголов",
    description: "Master the two conjugation patterns in Russian",
    difficulty: "beginner",
    lessons: [
      {
        id: "first-conjugation",
        title: "First Conjugation (-е/-ё pattern)",
        content: "First conjugation verbs have endings with -е- or -ё- in the present tense. Common patterns: -ю, -ешь, -ет, -ем, -ете, -ют.",
        examples: [
          { russian: "я читаю, ты читаешь, он читает", transliteration: "ya chitayu, ty chitayesh, on chitayet", english: "I read, you read, he reads" },
          { russian: "мы читаем, вы читаете, они читают", transliteration: "my chitayem, vy chitayete, oni chitayut", english: "we read, you (pl) read, they read" },
        ],
        exercises: [
          {
            id: "conj-1",
            type: "fill-blank",
            question: "Ты _____ (работать) сегодня?",
            correctAnswer: "работаешь",
            explanation: "For ты (you informal), first conjugation verbs end in -ешь.",
          },
        ],
      },
    ],
  },
  {
    id: "pronouns",
    title: "Personal Pronouns",
    titleRu: "Личные местоимения",
    description: "Learn Russian personal pronouns in all cases",
    difficulty: "beginner",
    lessons: [
      {
        id: "nominative-pronouns",
        title: "Nominative Pronouns",
        content: "Russian personal pronouns in nominative case: я (I), ты (you informal), он/она/оно (he/she/it), мы (we), вы (you formal/plural), они (they).",
        examples: [
          { russian: "Я студент.", transliteration: "Ya student.", english: "I am a student." },
          { russian: "Ты говоришь по-русски?", transliteration: "Ty govorish po-russki?", english: "Do you speak Russian?" },
          { russian: "Они живут в Москве.", transliteration: "Oni zhivut v Moskve.", english: "They live in Moscow." },
        ],
        exercises: [
          {
            id: "pron-1",
            type: "multiple-choice",
            question: "Which pronoun means \"they\"?",
            options: ["мы", "вы", "они", "оно"],
            correctAnswer: "они",
            explanation: "Они means they. Мы means we, вы means you (formal/plural), оно means it (neuter).",
          },
        ],
      },
    ],
  },
  {
    id: "prepositions",
    title: "Prepositions & Cases",
    titleRu: "Предлоги",
    description: "Understand which cases follow different prepositions",
    difficulty: "advanced",
    lessons: [
      {
        id: "prepositional-case",
        title: "Prepositions with Prepositional Case",
        content: "The prepositional case is used after в (in), на (on/at), and о (about) when indicating location or topic. Nouns typically end in -е.",
        examples: [
          { russian: "Я живу в Москве.", transliteration: "Ya zhivu v Moskve.", english: "I live in Moscow." },
          { russian: "Книга на столе.", transliteration: "Kniga na stole.", english: "The book is on the table." },
          { russian: "Мы говорим о работе.", transliteration: "My govorim o rabote.", english: "We talk about work." },
        ],
        exercises: [
          {
            id: "prep-1",
            type: "fill-blank",
            question: "Я думаю о _____ (ты).",
            correctAnswer: "тебе",
            explanation: "After о (about), pronouns take prepositional case. Ты becomes тебе.",
          },
        ],
      },
    ],
  },
]

export function getTopicById(id: string): GrammarTopic | undefined {
  return grammarTopics.find((topic) => topic.id === id)
}

export function getLessonById(topicId: string, lessonId: string): GrammarLesson | undefined {
  const topic = getTopicById(topicId)
  return topic?.lessons.find((lesson) => lesson.id === lessonId)
}
