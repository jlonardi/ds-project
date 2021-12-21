import { post } from './requests.js';

$(document).ready(() => {
  $('#order-form').submit(async event => {
    event.preventDefault();

    const form = $('#order-form')[0];

    const formData = new FormData(form);

    const checkboxes = $('#order-form').find('input[type=checkbox]');

    const products = [];

    $.each(checkboxes, function(key, val) {
      products.push({ id: $(val).attr('data-id'), selected: val.checked });
    });

    const selectedProductIds = products.filter(p => p.selected).map(p => p.id);

    const name = $('#name')[0].value;
    const address = $('#address')[0].value;
    const email = $('#email')[0].value;

    if (!name || !address || !email) {
      alert('Please fill all fields in the form.');
      return;
    }

    if (selectedProductIds.length === 0) {
      alert('You need to pick at least one product.');
      return;
    }

    const payload = {
      name,
      address,
      email,
      products: selectedProductIds
    };

    try {
      await post('/place-order', payload);
      console.log('payload', payload);
      window.location = '/orders?success=true';
    } catch (err) {
      alert('Something went wrong');
    }
  });
});
