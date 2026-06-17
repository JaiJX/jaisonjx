import portraitA from './assets/6.svg'
import portraitB from './assets/7.svg'
import portraitC from './assets/8.svg'

export const portraits = { a: portraitA, b: portraitB, c: portraitC }

export interface ScripturePoint {
  ref: string
  text: string
}

export interface Lens {
  id: string
  index: string
  kicker: string
  title: string
  /** short, punchy pull statements that appear first */
  pullPoints: string[]
  /** the fuller Beauvoir argument */
  beauvoir: string
  /** the biblical response */
  scripture: ScripturePoint[]
  portrait: string
  /** which side the portrait sits on for layout variety */
  align: 'left' | 'right'
}

export const lenses: Lens[] = [
  {
    id: 'god',
    index: '01',
    kicker: 'Lens One',
    title: 'God?',
    pullPoints: [
      'Raised Catholic — she lost her faith at fourteen.',
      '“It was easier for me to think of a world without a creator than of a creator burdened with all the contradiction in the world.”',
      'She came to see religion as supplying many with reasons to evade truth.',
    ],
    beauvoir:
      'Beauvoir rejects faith because she claims faith allows an evasion of those difficulties which the atheist confronts honestly. For her, religion becomes a form of the “spirit of seriousness” — treating chosen values as if they were absolute, fixed givens handed down from outside the self.',
    scripture: [
      {
        ref: 'Psalm 14:1',
        text: 'Scripture treats the denial of God as a moral and spiritual posture of the heart, not a neutral conclusion. Beauvoir calls belief a cowardly evasion — the Bible says it is unbelief that is the evasion.',
      },
      {
        ref: 'Hebrews 11:6',
        text: 'Without faith it is impossible to please God.',
      },
    ],
    portrait: portraitA,
    align: 'right',
  },
  {
    id: 'truth',
    index: '02',
    kicker: 'Lens Two',
    title: 'Truth?',
    pullPoints: [
      'Only our thoughts, actions, and reactions truly belong to us.',
      'Peace comes from accepting this truth.',
    ],
    beauvoir:
      'Beauvoir believes truth is found through lived experience, not detached reason alone. She writes that truth will come to light — and so we should look truth in the face; she affirms truth and opposes lies. She does not reject objective truth, but she rejects the “seriousness” of values and meanings treated as fixed givens.',
    scripture: [
      {
        ref: 'John 14:6',
        text: 'The Bible says that truth is found in your trust in Christ — “I am the way, the truth, and the life.”',
      },
      {
        ref: 'Proverbs 3:5–6',
        text: 'Beauvoir says rely on your own freedom with no outside bias. The Bible says the opposite — put your trust in the Lord, and lean not on your own understanding.',
      },
    ],
    portrait: portraitB,
    align: 'left',
  },
  {
    id: 'meaning',
    index: '03',
    kicker: 'Lens Three',
    title: 'Meaning & Purpose',
    pullPoints: [
      '“It is a desire which creates the desirable, and the project which sets up the end.”',
      'Meaning is invented — not random, and not pre-given.',
    ],
    beauvoir:
      'In The Ethics of Ambiguity, Beauvoir argues the universe has no pre-given meaning; humans create meaning through their actions. In Pyrrhus and Cineas she describes humanity’s natural restlessness — we always want more, and if we stopped wanting, we would stop being human.',
    scripture: [
      {
        ref: 'Genesis 1:27',
        text: 'In the Bible we are made in the image of God. Our purpose is given through Christ — it is not self-made.',
      },
      {
        ref: 'Ecclesiastes 12:13',
        text: 'The Bible tells us to fear the Lord and keep His commandments — for this is the whole duty of man.',
      },
    ],
    portrait: portraitC,
    align: 'right',
  },
]
