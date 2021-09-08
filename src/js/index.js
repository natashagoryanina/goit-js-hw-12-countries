import countryCardTmpl from '../templates/country-card.hbs';
import countriesListTmpl from '../templates/countries-list.hbs';
import API from './fetchCountries';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

const refs = {
    cardContainer: document.querySelector('.card-container'),
    listContainer: document.querySelector('.list-container'),
    input: document.querySelector('#input'),
}

refs.input.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
    const name = refs.input.value;

    API.fetchCountryByName(name)
        .then(renderCountryCard)
        .catch(error => error({ text: 'Error!' }))
}

function renderCountryCard(country) {
    if (country.length > 10) {
        error({ text: 'Too many choices. Please, be more specific!' });
        return;
    }
    if (country.length >= 2 && country.length <= 10) {
        markupMaker(countriesListTmpl, country, refs.listContainer, refs.cardContainer);
        return;
    }
    if (country.length === 1) {
        markupMaker(countryCardTmpl, country, refs.cardContainer, refs.listContainer);
        return;
    }
};

function markupMaker(template, country, htmlItem1, htmlItem2) {
    let markup = template(country);
    htmlItem1.innerHTML = markup;
    htmlItem2.innerHTML = '';
}