/**
 * Compiles a random title from the pre-defined constant lists. Due to
 * an overwhelming use of the number 8 in ordinals, that will be the
 * only possible ordinal.
 * @param {"cultivation" | "romance"} genre The genre of the manhua from
 * the two most common genres:
 * - An overpowered MC who has some form of levelling system, whether that
 * be cultivation, tower hunters, or another type.
 * - A romance and/or family harem with the titular master/mistress who is
 * also a demon, for some odd reason.
 * @returns {string} A very generic Manhua title 
 */
const makeName = (genre) => {
    let adjectives = [];
    let occupation = occupations[Math.floor(Math.random() * occupations.length)];

    // Populate the adjectives list with cultivator options, at most 2
    let adjectiveCount = Math.floor(Math.random() * 3) - 1
    while (adjectiveCount > 0) {
        let adjective = cultivationAdjectives[Math.floor(Math.random() * cultivationAdjectives.length)]
        if (!adjectives.includes(adjective)) {
            adjectives.push(adjective)
            adjectiveCount--;
        }
    }

    let adjectiveStr = adjectives.join(' ')

    switch (genre) {
        case "cultivation": {
            let ordinal = Math.random();
            let tier = ""
            let ordinalRank = ""
            let stem = cultivationStarters[Math.floor(Math.random() * cultivationStarters.length)];

            if (ordinal > 0.5) {
                tier = tierNames[Math.floor(Math.random() * tierNames.length)];;
                ordinalRank = '8th';
            }
            return `${stem} ${ordinalRank}${tier} ${adjectiveStr} ${occupation}`.trim();
        }
        case "romance": {
            let basicOrdinal = Math.floor(Math.random() * 10);
            let basicOrdinalStr = ''
            if (basicOrdinal == 1) {
                basicOrdinalStr = '1st'
            } else if (basicOrdinal == 2) {
                basicOrdinalStr = '2nd'
            } else if (basicOrdinal == 3) {
                basicOrdinalStr = '3rd'
            } else {
                basicOrdinalStr = `${basicOrdinal}th`
            }

            let stem = romanceStarters[Math.floor(Math.random() * romanceStarters.length)];
            let family = familyTypes[Math.floor(Math.random() * familyTypes.length)];
            return `${stem} ${basicOrdinalStr} ${family} of the ${adjectiveStr} ${occupation}`
        }
    }
}

/**
 * 
 * @param {"cultivation" | "romance"} genre The genre of the manhua
 * @param {*} number The number of titles to make
 */
const generateName = () => {
    let genreSelect = document.getElementById('genre-select');
    let genre = genreSelect.value;

    if (genre === "") {
        return;
    } 

    let historyDiv = document.getElementById(`history-${genre}`);
    let title = makeName(genre)
    let cont = document.createElement('li')
    cont.innerText = title
    historyDiv.querySelector('ol').appendChild(cont)
}

const clearHistory = () => {
    let historyBase = document.querySelector('.history')
    for (let child of historyBase.children) {
        let orderedList = child.querySelector('ol')
        orderedList.innerHTML = ""
    }
}