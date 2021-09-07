import countryCardTmpl from '../templates/country-card.hbs';
import countriesListTmpl from '../templates/countries-list.hbs';
import API from './fetchCountries';
//import { debounce } from 'lodash';
// import { defaults } from '@pnotify/core';
// defaults.styling = 'material';

const refs = {
    cardContainer: document.querySelector('.card-container'),
    listContainer: document.querySelector('.list-container'),
    input: document.querySelector('#input'),
}

//refs.input.addEventListener('input', _.debounce(onInputSearch, 500));
refs.input.addEventListener('input', onInputSearch);

function onInputSearch(e) {
    const input = e.currentTarget;
    const name = input.value;

    API.fetchCountryByName(name)
        .then(renderCountryCard)
        .catch(error => console.log(error))
        // .finally(() => {
        //     input.reset();
        // });
}

function renderCountryCard(country) {
    console.log(country);
    console.log(country.length);
    if (country.length > 1 && country.length < 10) {
        let markup = countriesListTmpl(country);
        refs.listContainer.innerHTML = markup;
        return;
    }
    if (country.length === 1) {
        let markup = countryCardTmpl(country);
        refs.cardContainer.innerHTML = markup;
        refs.listContainer.innerHTML = '';
        return;
    }
};