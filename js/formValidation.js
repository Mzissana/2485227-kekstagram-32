import '../vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');

const hashtagRequirements = /^#[a-zа-яё0-9]{1,19}$/i;


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});


pristine.addValidator(hashtagsInput, validateHashtags, 'Хэштеги должны начинаться с # и содержать от 1 до 20 символов');
pristine.addValidator(comments, validateComment, 'Комментарий не может содержать больше 140 символов');


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

function validateHashtags(value) {
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) {
    return false;
  }
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  if (uniqueTags.size !== hashtags.length) {
    return false;
  }
  return hashtags.every((tag) => hashtagRequirements.test(tag));
}

function validateComment(value) {
  return value.length <= 140;
}