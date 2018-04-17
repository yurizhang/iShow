'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _CarouselItem = require('./CarouselItem');

var _CarouselItem2 = _interopRequireDefault(_CarouselItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Carousel2.default.Item = _CarouselItem2.default;

exports.default = _Carousel2.default;