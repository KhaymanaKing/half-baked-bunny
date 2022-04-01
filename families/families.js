import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

function displayFamilies(families) {
    // fetch families from supabase
    // clear out the familiesEl
    familiesEl.textContent = '';
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        const familyEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        bunniesEl.classList.add('bunnies');
        familyEl.classList.add('family');
        // put the family name in the name element
        nameEl.textContent = family.name;
        // for each of this family's bunnies
        //    make an element with the css class 'bunny', and put the bunny's name in the text content
        //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
        // append this bunnyEl to the bunniesEl
        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('div');
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;

            bunnyEl.addEventListener('click', async () =>{
                await deleteBunny(bunny.id);

                const updateFamilies = await getFamilies();
                displayFamilies(updateFamilies);
            });
            bunniesEl.append(bunnyEl);
        }
         // append the bunniesEl and nameEl to the familyEl
        console.log(nameEl, bunniesEl);
        familyEl.append(nameEl, bunniesEl);
            // append the familyEl to the familiesEl
        familiesEl.append(familyEl);
    }
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
