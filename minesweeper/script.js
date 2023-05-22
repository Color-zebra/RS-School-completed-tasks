import Game from './modules/Game.js';

const game = new Game();

game.init();
console.log(`
  Привет! ТЗ по таску было довольно расплывчатое, а некоторые ответы автора в форме противоречили ТЗ, а также в конце таска в дискорде автор отметил некоторые варианты реализации, которые раньше считались ошибочными, как верные. Поэтому коротко опишу моменты моей реализации игры, чтобы легче было проверять \n

  1) В ТЗ есть пункт о расстановке мин только после первой открытой клетки. На вопрос что делать если пользователь решит сперва не открыть клетку, а поставить флаг четкого ответа ни у кого нет.
  Поэтому в моей реализации до первого клика нельзя поставить флаг, а также до первого клика игра не будет сохраняться (просто потому что сохранять нечего, игра не начата, мины не расставлены), но будут сохраняться выбранные опции игрового поля, цвет и звук. \n
  2) О том как реализовывать сохранение в ТЗ не сказано, у меня оно реализовано через сохранение перед закрытием страницы и загрузку игры сразу же после открытия страницы. Это не противоречит ТЗ, а также одобрено автором (хоть и со скрипом, см. закрепленные сообщения в дискорде, в канале с таском). Так же не забывайте, что не начатая игра, а также игра, которая уже завершилась сохраняться не будет. \n
  3) Флаги полность блокируют клетку как от открытия вручную, так и от автоматического открытия, когда открываются все пустые клетки вокруг. В форме автор указал что автоматическое открытие флагнутых клеток выглядит как баг, поэтому вот. Здесь тоже нет противоречия с ТЗ. \n
  4) Счетчик мин (черепки) считает гипотетическое количество оставшихся мин, то есть предполагает что вы установили все флаги верно. В минус не уходит, т.к. было бы странно видеть отрицательное количество мин. Также он все равно будет уменьшаться, даже если вы флагом не попали в мину, т.к. иначе игра теряет смысл. Счетчик флагов просто считает флаги и больше ничего. Данная реализация не противоречит ТЗ. \n
  5) В моей игре нет мин, вместо них проваливающиеся клетки, просто потому что так прикольнее :) Логика их работы такая же как и мин в сапере, отличие только визуальное.

  

  Спасибо за внимание, и успехов в учебе!!! :)
`);
