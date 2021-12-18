import Vue from 'vue';
import moment from '@/main';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate';
import {
  required,
  required_if,
  email,
  confirmed,
  regex,
  min,
  max,
  ext,
  size,
  numeric,
  integer,
  max_value,
} from 'vee-validate/dist/rules';
import validationMessagesRU from 'vee-validate/dist/locale/ru';
import validationMessagesEN from 'vee-validate/dist/locale/en';

import Axios from 'axios';
import LSService from '../shared/backend/LocalStorageService';
import { instance } from '@/shared/backend';
import i18n from '@/i18n';

const lsService = LSService.getService();

localize('en', validationMessagesEN);
localize('ru', validationMessagesRU);
localize(i18n.messages); // enable custom messages (merge in locale), otherwise will see just "{Field} ist ungültig."

// built-in validators (in Vee-validate)
extend('required', required);
extend('required_if', required_if);
extend('email', email);
extend('confirmed', confirmed);
extend('regex', regex);
extend('min', min);
extend('max', max);
extend('ext', ext);
extend('numeric', numeric);
extend('integer', integer);
extend('max_value', max_value);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// built-in validators (in Vee-validate)
extend('required', required);
extend('required_if', required_if);
extend('email', email);
extend('confirmed', confirmed);
extend('regex', regex);
extend('min', min);
extend('max', max);
extend('ext', ext);
extend('numeric', numeric);
extend('integer', integer);
extend('max_value', max_value);

// custom validators
extend('verify_password', {
  validate: value => {
    var strongRegex = new RegExp(
      '^(?=.*[a-z,ä,ö,ü])(?=.*[A-Z,Ä,Ö,Ü])(?=.*[0-9])(?=.*[!@_#?.$%^&*/\\\\])(?=.{8,})'
    );
    return strongRegex.test(value);
  },
});

extend('verify_phone', {
  validate: value => {
    var strongRegex = /^[0-9()+-\/]+$/;
    return strongRegex.test(value);
  },
});

extend('decimal', {
  validate: (value, args: any) => {
    var count = 1;
    if (args.length != 0 && parseInt(args[0])) {
      count = +args[0];
    }
    var strongRegex = new RegExp(`^[0-9]+(\.[0-9]{1,${count}})?$`);
    return strongRegex.test(value);
  },
});

extend('verify_already_exist_username', {
  validate: (value, args: any) => {
    var editingUserId =
      args[0] == '' ? '00000000-0000-0000-0000-000000000000' : args[0];

    var url = '/api/Streamers/ValidateUserName';
    return instance
      .post<Promise<void>>(url, {
        username: value,
        id: editingUserId,
      })
      .then((response: any) => true)
      .catch(e => {
        console.log(e.response.data);
        return false;
      });
  },
});
extend('verify_already_exist_email', {
  validate: async (value: any, args: any) => {
    var editingUserId =
      args[0] == '' ? '00000000-0000-0000-0000-000000000000' : args[0];
    var isForCustomer = args[1] == 'forCustomer' ? true : false;
    var url = '/api/Employees/ValidateExistingEmail';
    if (isForCustomer) {
      url = '/api/Employees/ValidateExistingEmailForContact';
    }
    try {
      const response = await instance.post<Promise<void>>(url, {
        email: value,
        id: editingUserId,
      });
      return true;
    } catch (e) {
      console.log(e.response.data);
      return false;
    }
  },
});

extend('url', {
  validate: str => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return !!pattern.test(str);
  },
});

// ??TODO: call `convertDateToMs` instead of `if (i18n.locale == 'de')`
// KPTM-475: fix strange validation error for `DE` locale
// We have 2 formats: 1) `dd.MM.yyyy` for DE locale and 2) `yyyy/MM/dd` for EN locale
function convertDateToMs(date: string) {
  // Check if date with dots (our DE format) AND date not in `YYYY.MM.DD` ISO format
  if (date.includes('.') && date.indexOf('.') !== 4) {
    date = moment(date, 'DD.MM.YYYY').format('YYYY/MM/DD');
  }
  var dateInMilliseconds = new Date(date).setHours(0, 0, 0, 0); // `new Date()` understand only ISO formant date formats like `YYYY-MM-DD` or `YYYY/MM/DD` for EN locale in our case
  return dateInMilliseconds;
}

//TODO make refactoring and move to components (all custom validators)
extend('verify_after', {
  validate: (value: string, args: any) => {
    var startDate = convertDateToMs(args[0]);
    var endDate = convertDateToMs(args[1]);
    var diff = endDate >= startDate;
    return diff;
  },
});

extend('verify_time_interval', {
  validate: (value: string) => {
    let split = value.split(' - ');
    if (split.length != 2) {
      return false;
    }
    if (split[0].length != 5 || split[1].length != 5) {
      return false;
    }
    let first = moment(split[0], 'hh:mm');
    let second = moment(split[1], 'hh:mm');
    if (!first.isValid() || !second.isValid()) {
      return false;
    }
    return true;
  },
});
