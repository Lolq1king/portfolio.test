const fs = require('fs');

const enAdditions = {
  // Bookshelf Frame & Headers
  "bookshelf-frame-name": "📜 WIZARD LIBRARY",
  "bookshelf-frame-desc": "Reading is one of Wizard Lolq's main interests. The collection contains his favorite book series from LitRPG, Fantasy & Sci-Fi, and Self-Development genres.",
  "bookshelf-frame-extra": "Wizard Lolq's Interests: LitRPG, Fantasy & Sci-Fi, Self-Dev",
  
  "bookshelf-main-header-name": "📜 WIZARD LIBRARY",
  "bookshelf-main-header-desc": "Reading is one of Wizard Lolq's main interests. The collection contains his favorite book series.",
  "bookshelf-main-header-extra": "Wizard Lolq's Interests: LitRPG, Fantasy & Sci-Fi",

  // Shelf Tags
  "shelf-series-tag-3-0-name": "🔮 SERIES: THE WAY OF THE SHAMAN (Vol 1-7)",
  "shelf-series-tag-3-0-desc": "Top LitRPG Shelf – \"The Way of the Shaman\" series (Vasily Mahanenko, 7 volumes)",
  "shelf-series-tag-3-1-name": "⚠️ SERIES: THE DARK HERBALIST (Vol 1-3)",
  "shelf-series-tag-3-1-desc": "Top LitRPG Shelf – \"World of the Changed\" series (Vasily Mahanenko, 3 volumes)",
  "shelf-series-tag-3-2-name": "🎮 SERIES: LEVEL UP (Vol 1-3)",
  "shelf-series-tag-3-2-desc": "Top LitRPG Shelf – \"Level Up\" series (Dan Sugralinov, 3 volumes)",
  "shelf-series-tag-3-3-name": "🐱 DUNGEON CRAWLER CARL",
  "shelf-series-tag-3-3-desc": "Top LitRPG Shelf – \"Dungeon Crawler Carl\" series (Matt Dinniman, 2 volumes)",
  "shelf-series-tag-3-4-name": "🏹 PRIMAL HUNTER",
  "shelf-series-tag-3-4-desc": "Top LitRPG Shelf – \"Primal Hunter\" (Zogarth, Vol 1)",

  "shelf-series-tag-2-0-name": "🐺 SERIES: THE WITCHER (Vol 1-8)",
  "shelf-series-tag-2-0-desc": "Middle Fantasy Shelf – The Witcher Saga (Andrzej Sapkowski, 8 volumes)",
  "shelf-series-tag-2-1-name": "⚡ SERIES: HARRY POTTER (Vol 1-7)",
  "shelf-series-tag-2-1-desc": "Middle Fantasy Shelf – Harry Potter series (J.K. Rowling, 7 volumes)",
  "shelf-series-tag-2-2-name": "🚀 STAR WANDERER",
  "shelf-series-tag-2-2-desc": "Middle Sci-Fi Shelf – \"Star Wanderer\" (Rafaello Morgan)",

  "shelf-series-tag-1-0-name": "🤖 BIOGRAPHIES & TECHNOLOGY",
  "shelf-series-tag-1-0-desc": "Bottom Shelf – Biographies and tech history (Stephen Witt, Jens Andersen)",
  "shelf-series-tag-1-1-name": "💰 FINANCE & INVESTING",
  "shelf-series-tag-1-1-desc": "Bottom Shelf – Finance and investing (Kiyosaki, Graham)",
  "shelf-series-tag-1-2-name": "⚡ SELF-DEV & PSYCHOLOGY",
  "shelf-series-tag-1-2-desc": "Bottom Shelf – Self-development and psychology (Walkiewicz, Peterson)",

  // Szaman
  "szaman-1-name": "The Way of the Shaman. Book 1: Survival Quest",
  "szaman-1-desc": "Book 1 of The Way of the Shaman (LitRPG). Convicted Mahan enters the virtual world of Barliona as a Shaman and begins his fight for survival.",
  "szaman-2-name": "The Way of the Shaman. Book 2: The Kartoss Gambit",
  "szaman-2-desc": "Book 2. Development of the unique Shaman class, intrigues in the Prisma mines and rivalry with Barliona guilds.",
  "szaman-3-name": "The Way of the Shaman. Book 3: The Secret of the Dark Forest",
  "szaman-3-desc": "Book 3. Expedition into the dangerous regions of the Dark Forest, searching for rare ingredients and powerful spirits.",
  "szaman-4-name": "The Way of the Shaman. Book 4: The Phantom Castle",
  "szaman-4-desc": "Book 4. Epic raids, fortress sieges, and the fight for control over strategic game resources.",
  "szaman-5-name": "The Way of the Shaman. Book 5: The Karmadont Chess Set",
  "szaman-5-desc": "Book 5. Complex high-level political games where every move can decide the fate of Barliona.",
  "szaman-6-name": "The Way of the Shaman. Book 6: Everybody Hates Large Chests",
  "szaman-6-desc": "Book 6. An attempt to rebuild position, overcome own limitations, and reach for the Shaman's power again.",
  "szaman-7-name": "The Way of the Shaman. Book 7: Clan War",
  "szaman-7-desc": "Book 7. The culmination and grand finale of the seven-volume LitRPG series about Mahan's adventures in Barliona.",

  // Przeistoczeni
  "przeistoczeni-1-name": "World of the Changed. Book 1: No Mistakes",
  "przeistoczeni-1-desc": "Book 1. Earth is included in the alien game area, and humans must fight for survival.",
  "przeistoczeni-2-name": "World of the Changed. Book 2: Pearl of the South",
  "przeistoczeni-2-desc": "Book 2. Mark Cather continues his struggles in the transformed world, striving to master key footholds.",
  "przeistoczeni-3-name": "World of the Changed. Book 3: Personified Noa",
  "przeistoczeni-3-desc": "Book 3. The culmination of the fight against invaders, discovering the secrets of higher Noa energy.",

  // Level Up
  "levelup-1-name": "Level Up. Book 1: Re-start",
  "levelup-1-desc": "Book 1 of Level Up (LitRPG/GameLit). Phil receives an extraordinary reality interface with stats and level bars.",
  "levelup-2-name": "Level Up. Book 2: Hero",
  "levelup-2-desc": "Book 2. Developing skills in the real world, overcoming further difficulty levels and new challenges.",
  "levelup-3-name": "Level Up. Book 3: Trial",
  "levelup-3-desc": "Book 3. The ultimate test of Phil's abilities, a great clash and an attempt to understand the interface.",

  // Dungeon Crawler Carl
  "dungeon-1-name": "Dungeon Crawler Carl. Book 1",
  "dungeon-1-desc": "Book 1. Carl and his cat Princess Donut are dragged into a murderous cosmic reality show dungeon.",
  "dungeon-2-name": "Dungeon Crawler Carl. Book 2: Carl's Doomsday",
  "dungeon-2-desc": "Book 2. Further fight of Carl and Donut on the 2nd level of the dungeon, where game rules get even crazier.",

  // Primal Hunter
  "primal-1-name": "Primal Hunter. Book 1",
  "primal-1-desc": "Book 1. Jake and his coworkers enter the Tutorial, where he discovers his talent as a born hunter.",

  // Wiedzmin
  "wiedzmin-1-name": "The Witcher. Book 1: The Last Wish",
  "wiedzmin-1-desc": "Short story collection introducing the witcher's world. The story of Geralt of Rivia's first contracts.",
  "wiedzmin-2-name": "The Witcher. Book 2: Sword of Destiny",
  "wiedzmin-2-desc": "Second collection. Geralt meets Ciri in Brokilon and learns the inevitability of the Law of Surprise.",
  "wiedzmin-3-name": "The Witcher. Book 3: Blood of Elves (Saga 1)",
  "wiedzmin-3-desc": "First volume of the Saga. Ciri trains in Kaer Morhen while the world heads towards war.",
  "wiedzmin-4-name": "The Witcher. Book 4: Time of Contempt (Saga 2)",
  "wiedzmin-4-desc": "Second volume. The coup on Thanedd island destroys the Chapter of Wizards.",
  "wiedzmin-5-name": "The Witcher. Book 5: Baptism of Fire (Saga 3)",
  "wiedzmin-5-desc": "Third volume. Geralt sets out with Dandelion, Milva, Cahir, and Regis to find Ciri.",
  "wiedzmin-6-name": "The Witcher. Book 6: The Tower of the Swallow (Saga 4)",
  "wiedzmin-6-desc": "Fourth volume. Ciri heals at Vysogota's hermitage and faces the ruthless killer Bonhart.",
  "wiedzmin-7-name": "The Witcher. Book 7: The Lady of the Lake (Saga 5)",
  "wiedzmin-7-desc": "Grand finale of the Saga. Climactic battles at Stygga castle, the Battle of Brenna.",
  "wiedzmin-8-name": "The Witcher. Book 8: Season of Storms",
  "wiedzmin-8-desc": "Standalone novel set before the Saga. Theft of witcher swords and wizard intrigues.",

  // Harry Potter
  "harry-1-name": "Harry Potter and the Sorcerer's Stone",
  "harry-1-desc": "Book 1. Eleven-year-old Harry discovers his magical heritage and begins his education at Hogwarts.",
  "harry-2-name": "Harry Potter and the Chamber of Secrets",
  "harry-2-desc": "Book 2. A mysterious monster attacks Hogwarts students.",
  "harry-3-name": "Harry Potter and the Prisoner of Azkaban",
  "harry-3-desc": "Book 3. Fugitive Sirius Black escapes from Azkaban prison.",
  "harry-4-name": "Harry Potter and the Goblet of Fire",
  "harry-4-desc": "Book 4. The Triwizard Tournament at Hogwarts leads to the rebirth of Lord Voldemort.",
  "harry-5-name": "Harry Potter and the Order of the Phoenix",
  "harry-5-desc": "Book 5. Formation of the underground Order of the Phoenix and Dumbledore's Army.",
  "harry-6-name": "Harry Potter and the Half-Blood Prince",
  "harry-6-desc": "Book 6. Harry and Dumbledore uncover the secrets of Voldemort's Horcruxes.",
  "harry-7-name": "Harry Potter and the Deathly Hallows",
  "harry-7-desc": "The final book. The quest for Horcruxes and the great Battle of Hogwarts.",

  // Gwiezdny Wedrowiec
  "gwiezdny-1-name": "Star Wanderer",
  "gwiezdny-1-desc": "Sci-Fi novel by Rafaello Morgan. Martian freighter pilot Sven Ante gets drawn into a galactic conflict.",

  // Samorozwoj
  "samorozwoj-1-name": "The Thinking Machine. Jensen Huang and Nvidia",
  "samorozwoj-1-desc": "Biography of Jensen Huang and the history of Nvidia. Evolution from GPU maker to AI giant.",
  "samorozwoj-2-name": "The LEGO Story",
  "samorozwoj-2-desc": "Comprehensive biography of the Ole Kirk Christiansen family who built the global LEGO empire.",
  "samorozwoj-3-name": "Rich Dad Poor Dad",
  "samorozwoj-3-desc": "Bestselling financial education guide. The classic of building financial independence and assets.",
  "samorozwoj-4-name": "Cashflow Quadrant",
  "samorozwoj-4-desc": "Guide to financial freedom. Analysis of the 4 groups: Employee, Self-employed, Business owner, Investor.",
  "samorozwoj-5-name": "Jacek Walkiewicz's Musings",
  "samorozwoj-5-desc": "Reflections on courage, dreams, decision making, and building your own life path.",
  "samorozwoj-6-name": "Full Power of Life",
  "samorozwoj-6-desc": "Cult book about unleashing your potential, crossing comfort zones, and boldly pursuing passions.",
  "samorozwoj-7-name": "The Intelligent Investor",
  "samorozwoj-7-desc": "The bible of value investing, considered by Warren Buffett as the best finance book ever written.",
  "samorozwoj-8-name": "12 Rules for Life",
  "samorozwoj-8-desc": "Philosophical and psychological guide. 12 practical rules to organize life and face challenges."
};

let i18nContent = fs.readFileSync('src/utils/i18n.js', 'utf8');

// We will insert these keys into the 'en: {' block.
// Let's find the end of the 'en' block. It ends just before '    };'
let lines = [];
for (const [key, value] of Object.entries(enAdditions)) {
  lines.push(`        '${key}': ${JSON.stringify(value)},`);
}

const replacement = lines.join('\n') + '\n      }\n    };';
i18nContent = i18nContent.replace(/      \}\n    \};/, replacement);

fs.writeFileSync('src/utils/i18n.js', i18nContent);
console.log("Updated i18n.js with all book translations!");
