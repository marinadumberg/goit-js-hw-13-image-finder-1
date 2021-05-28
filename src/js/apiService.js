import pixabay from './pixabay';

export default class UploadImage {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.refs = this.getRefs();
  }
  getRefs() {
    const refs = {
      submitBtnText: document.querySelector('.submit-button-text'),
      searchBtnSpinner: document.querySelector('.search-button-spinner'),
    };
    return refs;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  async fetchArticles() {
    try {
      const url = `${pixabay.baseURL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${pixabay.APIkey}`;
      const images = await fetch(url);
      const response = await images.json();
      this.incrementPage();
      return response;
    } catch {
      alert('Error');
    }
  }

  showSpinner() {
    this.refs.submitBtnText.textContent = 'Loading...';
    this.refs.searchBtnSpinner.classList.remove('is-hidden');
  }

  hideSpinner() {
    this.refs.submitBtnText.textContent = 'Upload images';
    this.refs.searchBtnSpinner.classList.add('is-hidden');
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}