import './styles.css';
import galleryListTpl from './templates/image-list.hbs';
import UploadImage from './js/apiService';
import LoadMoreButton from './js/loadMoreButtonService';
import refs from './js/refs';

const loadMoreButton = new LoadMoreButton({
  selector: '.load-more',
  hidden: true,
});

const uploadImages = new UploadImage();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  uploadImages.query = e.currentTarget.elements.query.value;
  uploadImages.showSpinner();

  if (uploadImages.query === '') {
    alert('Не верно введены данные');
    uploadImages.hideSpinner();
    loadMoreButton.hide();
    clearImageContainer();
  } else {
    loadMoreButton.show();
    clearImageContainer();
    uploadImages.resetPage();

    onLoadMore();
  }
}

function onLoadMore() {
  loadMoreButton.disable();
  uploadImages.fetchArticles().then(({ hits }) => {
    appendImagesMarkup(hits);
    loadMoreButton.enable();
    uploadImages.hideSpinner();
    scrollPage();
  });
}

function appendImagesMarkup(hits) {
  refs.imagesSection.insertAdjacentHTML('beforeend', galleryListTpl(hits));
}

function clearImageContainer() {
  refs.imagesSection.innerHTML = '';
}

function scrollPage() {
  const scrollValue = document.documentElement.scrollHeight;

  setTimeout(() => {
    window.scrollTo({
      top: scrollValue,
      behavior: 'smooth',
    });
  }, 100);
}

