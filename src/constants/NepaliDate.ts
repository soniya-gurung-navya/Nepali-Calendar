export type BSDate = {
  year: number
  month: number   
  date: number    
  weekday: number      
}

export const monthNames = [
  "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
] as const;


export const formatObj = {
  day: {
    short: {
      ne: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    long:{
       ne:  ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
       en:["Sunday", 'Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday']
    }
    
  },
  month: {
    short: ['बै', 'जे', 'अ', 'श्रा', 'भा', 'आ', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'],
    long:{
 ne: [
      'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भाद्र', 'आश्विन',
      'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुण', 'चैत्र',
    ],
    en:["Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
"Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
]
    }
    
  },
  date: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
}

export const anchorBS: BSDate = { year: 2000, month: 1, date: 1, weekday: 1} 
export const anchorAD = new Date(1943, 3, 14)