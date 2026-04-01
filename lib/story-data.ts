export interface Story {
  id: string
  title: string
  titleRu: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  readTime: number
  paragraphs: StoryParagraph[]
  quiz: QuizQuestion[]
  vocabulary: VocabularyWord[]
}

export interface StoryParagraph {
  russian: string
  transliteration: string
  english: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

export interface VocabularyWord {
  word: string
  transliteration: string
  meaning: string
  example?: string
}

export const stories: Story[] = [
  {
    id: "the-golden-fish",
    title: "The Golden Fish",
    titleRu: "Золотая рыбка",
    description: "A classic Russian fairy tale about a fisherman and a magical fish",
    difficulty: "beginner",
    readTime: 5,
    paragraphs: [
      {
        russian: "Жил-был старик со своей старухой у самого синего моря.",
        transliteration: "Zhil-byl starik so svoyey starukhoy u samogo sinego morya.",
        english: "Once upon a time, an old man lived with his old woman by the very blue sea.",
      },
      {
        russian: "Они жили в ветхой землянке ровно тридцать лет и три года.",
        transliteration: "Oni zhili v vetkhoy zemlyanke rovno tridtsat let i tri goda.",
        english: "They lived in an old dugout for exactly thirty years and three years.",
      },
      {
        russian: "Старик ловил неводом рыбу, старуха пряла свою пряжу.",
        transliteration: "Starik lovil nevodom rybu, starukha pryala svoyu pryazhu.",
        english: "The old man caught fish with a net, the old woman spun her yarn.",
      },
      {
        russian: "Раз он закинул невод - пришёл невод с одною тиной.",
        transliteration: "Raz on zakinul nevod - prishyol nevod s odnoyu tinoy.",
        english: "Once he cast his net - the net came back with only seaweed.",
      },
      {
        russian: "Он в другой раз закинул невод - пришёл невод с травой морской.",
        transliteration: "On v drugoy raz zakinul nevod - prishyol nevod s travoy morskoy.",
        english: "He cast the net a second time - the net came back with sea grass.",
      },
      {
        russian: "В третий раз закинул он невод - пришёл невод с одною рыбкой.",
        transliteration: "V tretiy raz zakinul on nevod - prishyol nevod s odnoyu rybkoy.",
        english: "The third time he cast the net - the net came back with just one fish.",
      },
      {
        russian: "С непростою рыбкой - золотой!",
        transliteration: "S neprostoyu rybkoy - zolotoy!",
        english: "Not an ordinary fish - a golden one!",
      },
    ],
    vocabulary: [
      { word: "старик", transliteration: "starik", meaning: "old man" },
      { word: "старуха", transliteration: "starukha", meaning: "old woman" },
      { word: "море", transliteration: "morye", meaning: "sea" },
      { word: "рыба", transliteration: "ryba", meaning: "fish" },
      { word: "невод", transliteration: "nevod", meaning: "fishing net" },
      { word: "золотой", transliteration: "zolotoy", meaning: "golden" },
    ],
    quiz: [
      {
        id: "gf-1",
        question: "Where did the old man and woman live?",
        options: ["In a forest", "By the sea", "In a city", "On a mountain"],
        correctAnswer: "By the sea",
      },
      {
        id: "gf-2",
        question: "How many years did they live in their home?",
        options: ["10 years", "33 years", "50 years", "100 years"],
        correctAnswer: "33 years",
      },
      {
        id: "gf-3",
        question: "What did the old man catch on his third try?",
        options: ["Seaweed", "Sea grass", "A golden fish", "Nothing"],
        correctAnswer: "A golden fish",
      },
    ],
  },
  {
    id: "the-turnip",
    title: "The Turnip",
    titleRu: "Репка",
    description: "A beloved children's tale about teamwork and persistence",
    difficulty: "beginner",
    readTime: 3,
    paragraphs: [
      {
        russian: "Посадил дед репку.",
        transliteration: "Posadil ded repku.",
        english: "Grandfather planted a turnip.",
      },
      {
        russian: "Выросла репка большая-пребольшая.",
        transliteration: "Vyrosla repka bolshaya-prebolshaya.",
        english: "The turnip grew very, very big.",
      },
      {
        russian: "Стал дед репку из земли тянуть: тянет-потянет, вытянуть не может.",
        transliteration: "Stal ded repku iz zemli tyanut: tyanet-potyanet, vytyanut ne mozhet.",
        english: "Grandfather started pulling the turnip from the ground: he pulls and pulls, but cannot pull it out.",
      },
      {
        russian: "Позвал дед бабку. Бабка за дедку, дедка за репку.",
        transliteration: "Pozval ded babku. Babka za dedku, dedka za repku.",
        english: "Grandfather called grandmother. Grandmother holds grandfather, grandfather holds the turnip.",
      },
      {
        russian: "Тянут-потянут, вытянуть не могут.",
        transliteration: "Tyanut-potyanut, vytyanut ne mogut.",
        english: "They pull and pull, but cannot pull it out.",
      },
      {
        russian: "Позвала бабка внучку. Внучка за бабку, бабка за дедку, дедка за репку.",
        transliteration: "Pozvala babka vnuchku. Vnuchka za babku, babka za dedku, dedka za repku.",
        english: "Grandmother called granddaughter. Granddaughter holds grandmother, grandmother holds grandfather, grandfather holds the turnip.",
      },
      {
        russian: "Тянут-потянут - вытянули репку!",
        transliteration: "Tyanut-potyanut - vytyanuli repku!",
        english: "They pull and pull - they pulled out the turnip!",
      },
    ],
    vocabulary: [
      { word: "репка", transliteration: "repka", meaning: "turnip" },
      { word: "дед", transliteration: "ded", meaning: "grandfather" },
      { word: "бабка", transliteration: "babka", meaning: "grandmother" },
      { word: "внучка", transliteration: "vnuchka", meaning: "granddaughter" },
      { word: "тянуть", transliteration: "tyanut", meaning: "to pull" },
      { word: "большой", transliteration: "bolshoy", meaning: "big" },
    ],
    quiz: [
      {
        id: "t-1",
        question: "What did grandfather plant?",
        options: ["A carrot", "A turnip", "A potato", "An apple tree"],
        correctAnswer: "A turnip",
      },
      {
        id: "t-2",
        question: "Who did grandfather call first?",
        options: ["Granddaughter", "Dog", "Grandmother", "Cat"],
        correctAnswer: "Grandmother",
      },
      {
        id: "t-3",
        question: "What is the moral of the story?",
        options: ["Be patient", "Work alone", "Teamwork succeeds", "Plant small seeds"],
        correctAnswer: "Teamwork succeeds",
      },
    ],
  },
  {
    id: "moscow-metro",
    title: "Moscow Metro",
    titleRu: "Московское метро",
    description: "Learn about the beautiful Moscow subway system",
    difficulty: "intermediate",
    readTime: 4,
    paragraphs: [
      {
        russian: "Московское метро - одно из самых красивых в мире.",
        transliteration: "Moskovskoye metro - odno iz samykh krasivykh v mire.",
        english: "The Moscow Metro is one of the most beautiful in the world.",
      },
      {
        russian: "Его открыли в 1935 году.",
        transliteration: "Yego otkryli v tysyacha devyatsot tridtsat pyatom godu.",
        english: "It was opened in 1935.",
      },
      {
        russian: "Многие станции украшены мрамором, мозаикой и скульптурами.",
        transliteration: "Mnogiye stantsii ukrasheny mramorom, mozaikoy i skulpturami.",
        english: "Many stations are decorated with marble, mosaics, and sculptures.",
      },
      {
        russian: "Каждый день метро перевозит миллионы пассажиров.",
        transliteration: "Kazhdyy den metro perevozit milliony passazhirov.",
        english: "Every day the metro carries millions of passengers.",
      },
      {
        russian: "Станция «Маяковская» считается одной из самых красивых станций.",
        transliteration: "Stantsiya Mayakovskaya schitayetsya odnoy iz samykh krasivykh stantsiy.",
        english: "Mayakovskaya station is considered one of the most beautiful stations.",
      },
    ],
    vocabulary: [
      { word: "метро", transliteration: "metro", meaning: "subway/metro" },
      { word: "станция", transliteration: "stantsiya", meaning: "station" },
      { word: "красивый", transliteration: "krasivyy", meaning: "beautiful" },
      { word: "пассажир", transliteration: "passazhir", meaning: "passenger" },
      { word: "мрамор", transliteration: "mramor", meaning: "marble" },
    ],
    quiz: [
      {
        id: "mm-1",
        question: "When was the Moscow Metro opened?",
        options: ["1925", "1935", "1945", "1955"],
        correctAnswer: "1935",
      },
      {
        id: "mm-2",
        question: "What decorates many stations?",
        options: ["Only paint", "Marble and mosaics", "Wood", "Plastic"],
        correctAnswer: "Marble and mosaics",
      },
    ],
  },
  {
    id: "russian-tea",
    title: "Russian Tea Tradition",
    titleRu: "Русское чаепитие",
    description: "Discover the Russian tradition of tea drinking",
    difficulty: "intermediate",
    readTime: 4,
    paragraphs: [
      {
        russian: "Чай - любимый напиток в России.",
        transliteration: "Chay - lyubimyy napitok v Rossii.",
        english: "Tea is a favorite drink in Russia.",
      },
      {
        russian: "Русские пьют чай с вареньем, мёдом или лимоном.",
        transliteration: "Russkiye pyut chay s varenyem, myodom ili limonom.",
        english: "Russians drink tea with jam, honey, or lemon.",
      },
      {
        russian: "Самовар - традиционный прибор для приготовления чая.",
        transliteration: "Samovar - traditsionnyy pribor dlya prigotovleniya chaya.",
        english: "A samovar is a traditional device for making tea.",
      },
      {
        russian: "Гости всегда получают чашку горячего чая.",
        transliteration: "Gosti vsegda poluchayut chashku goryachego chaya.",
        english: "Guests always receive a cup of hot tea.",
      },
      {
        russian: "Чаепитие - это время для разговоров с семьёй и друзьями.",
        transliteration: "Chayepitiye - eto vremya dlya razgovorov s semyoy i druzyami.",
        english: "Tea time is a time for conversations with family and friends.",
      },
    ],
    vocabulary: [
      { word: "чай", transliteration: "chay", meaning: "tea" },
      { word: "напиток", transliteration: "napitok", meaning: "drink/beverage" },
      { word: "варенье", transliteration: "varenye", meaning: "jam" },
      { word: "мёд", transliteration: "myod", meaning: "honey" },
      { word: "самовар", transliteration: "samovar", meaning: "samovar (tea urn)" },
      { word: "гость", transliteration: "gost", meaning: "guest" },
    ],
    quiz: [
      {
        id: "rt-1",
        question: "What do Russians often add to tea?",
        options: ["Milk only", "Jam, honey, or lemon", "Sugar only", "Nothing"],
        correctAnswer: "Jam, honey, or lemon",
      },
      {
        id: "rt-2",
        question: "What is a samovar?",
        options: ["A type of tea", "A device for making tea", "A Russian cake", "A tea cup"],
        correctAnswer: "A device for making tea",
      },
    ],
  },
  {
    id: "winter-day",
    title: "A Winter Day",
    titleRu: "Зимний день",
    description: "Experience a typical winter day in Russia",
    difficulty: "beginner",
    readTime: 3,
    paragraphs: [
      {
        russian: "Сегодня холодно.",
        transliteration: "Segodnya kholodno.",
        english: "Today it is cold.",
      },
      {
        russian: "На улице идёт снег.",
        transliteration: "Na ulitse idyot sneg.",
        english: "Outside it is snowing.",
      },
      {
        russian: "Дети играют в снежки.",
        transliteration: "Deti igrayut v snezhki.",
        english: "Children are playing snowballs.",
      },
      {
        russian: "Они лепят снеговика.",
        transliteration: "Oni lepyat snegovika.",
        english: "They are making a snowman.",
      },
      {
        russian: "Вечером все пьют горячий чай дома.",
        transliteration: "Vecherom vse pyut goryachiy chay doma.",
        english: "In the evening everyone drinks hot tea at home.",
      },
    ],
    vocabulary: [
      { word: "холодно", transliteration: "kholodno", meaning: "cold" },
      { word: "снег", transliteration: "sneg", meaning: "snow" },
      { word: "дети", transliteration: "deti", meaning: "children" },
      { word: "снеговик", transliteration: "snegovik", meaning: "snowman" },
      { word: "вечер", transliteration: "vecher", meaning: "evening" },
    ],
    quiz: [
      {
        id: "wd-1",
        question: "What is the weather like?",
        options: ["Hot", "Cold", "Rainy", "Windy"],
        correctAnswer: "Cold",
      },
      {
        id: "wd-2",
        question: "What are the children making?",
        options: ["A sandcastle", "A snowman", "A house", "A cake"],
        correctAnswer: "A snowman",
      },
    ],
  },
]

export function getStoryById(id: string): Story | undefined {
  return stories.find((story) => story.id === id)
}
