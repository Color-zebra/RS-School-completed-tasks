import { ModeNames, SortOrders, SortTypes } from '../../shared/types/enums';
import { Winner } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import ServerAPI from '../../shared/utils/ServerAPI';
import './winners.scss';

export default class Winners extends ElemController {
  protected classes: Record<string, string>;

  protected columnNames: Record<string, string>;

  private serverAPI: ServerAPI;

  private sortByIdContol: HTMLElement;

  private sortByWinsContol: HTMLElement;

  private sortByTimeContol: HTMLElement;

  private sortByIdOrder: SortOrders;

  private sortByWinsOrder: SortOrders;

  private sortByTimeOrder: SortOrders;

  private currentPage: number;

  private tableContent: HTMLElement;

  totalWinners: number;

  currPageWinners: Winner[];

  currPageIcons: SVGUseElement[];

  mode: ModeNames;

  sortOrders: Record<string, SortOrders>;

  sortType: SortTypes;

  constructor() {
    super();

    this.classes = {
      baseClass: 'winners',
      rightOrder: 'right-order',
      reverseOrder: 'reverse-order',
    };

    this.columnNames = {
      id: 'Id',
      image: 'Image',
      name: 'Name',
      wins: 'Total wins',
      time: 'Best time',
    };

    this.serverAPI = ServerAPI.getInstance();

    this.sortByIdContol = this.createElem('th', [this.columnNames.id], this.classes.rightOrder);
    this.sortByWinsContol = this.createElem('th', [this.columnNames.wins], this.classes.rightOrder);
    this.sortByTimeContol = this.createElem('th', [this.columnNames.time], this.classes.rightOrder);
    this.tableContent = this.createElem('tbody', null, null);

    this.sortByIdOrder = SortOrders.RIGHT;
    this.sortByWinsOrder = SortOrders.RIGHT;
    this.sortByTimeOrder = SortOrders.RIGHT;
    this.sortType = SortTypes.byId;

    this.sortOrders = {
      id: SortOrders.RIGHT,
      wins: SortOrders.RIGHT,
      time: SortOrders.RIGHT,
    };

    this.currentPage = 1;
    this.totalWinners = 0;
    this.currPageWinners = [];
    this.currPageIcons = [];

    this.mode = ModeNames.strict;

    this.init();
  }

  protected init() {
    this.createTable();
    this.renderWinners();

    this.hydrate();
  }

  protected async renderWinners() {
    this.clear();
    const res = await this.serverAPI.getWinners(this.sortType, this.sortOrders[`${this.sortType}`], this.currentPage);
    console.log(res);

    if (res?.count) {
      this.totalWinners = +res.count;
    }

    if (res?.winners) {
      res.winners.forEach(async (winner) => {
        const carInfo = await this.serverAPI.getCar(winner.id);
        console.log(carInfo);
        if (!carInfo) return;
        const { color, name } = carInfo;
        const tableRow = this.createWinnerRow(winner.id, color, name, winner.wins, winner.time);
        this.tableContent.append(tableRow);
      });
    }
  }

  private hydrate() {
    this.sortByIdContol.addEventListener('click', () => this.sortBy(SortTypes.byId));
    this.sortByWinsContol.addEventListener('click', () => this.sortBy(SortTypes.byWins));
    this.sortByTimeContol.addEventListener('click', () => this.sortBy(SortTypes.byTime));
  }

  sortBy(sortType: SortTypes) {
    this.renderWinners();
    this.sortOrders[this.sortType] =
      this.sortOrders[this.sortType] === SortOrders.REVERS ? SortOrders.RIGHT : SortOrders.REVERS;
    this.sortType = sortType;
  }

  private createTable() {
    const imageColumnHeader = this.createElem('th', [this.columnNames.image], null);
    const nameColumnHeader = this.createElem('th', [this.columnNames.name], null);

    const headersRow = this.createElem(
      'tr',
      [this.sortByIdContol, imageColumnHeader, nameColumnHeader, this.sortByWinsContol, this.sortByTimeContol],
      null
    );

    const tableHeader = this.createElem('thead', [headersRow], null);

    const table = this.createElem('table', [tableHeader, this.tableContent], null);

    this.elem = this.createElem('div', [table], this.classes.baseClass);
  }

  private clear() {
    this.tableContent.innerHTML = '';
    this.currPageIcons.length = 0;
  }

  private createWinnerRow(id: number, imageColor: string, name: string, wins: number, time: number) {
    const idCell = this.createElem('td', [String(id)], null);
    const imageCell = this.createElem('td', [this.createImage(imageColor)], null);
    const nameCell = this.createElem('td', [name], null);
    const winsCell = this.createElem('td', [String(wins)], null);
    const timeCell = this.createElem('td', [String(time)], null);

    const res = this.createElem('tr', [idCell, imageCell, nameCell, winsCell, timeCell], null);

    return res;
  }

  private createImage(color: string) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgElem = document.createElementNS(svgNS, 'svg') as SVGElement;
    const useElem = document.createElementNS(svgNS, 'use') as SVGUseElement;
    useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/sprite.svg#car-icon');
    svgElem.setAttribute('color', color);
    svgElem.setAttribute('width', '40px');
    svgElem.setAttribute('height', '40px');
    svgElem.appendChild(useElem);
    const container = this.createElem('div', [svgElem], this.classes.baseClass);

    this.currPageIcons.push(useElem);

    return container;
  }
}
