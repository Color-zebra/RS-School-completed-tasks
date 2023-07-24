import Pagination from '../../features/Pagination/Pagination';
import { brandTransformer, modelTransformer } from '../../shared/data/carName';
import { ModeNames, SortOrders, SortTypes } from '../../shared/types/enums';
import { Winner } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import ServerAPI from '../../shared/utils/ServerAPI';
import './winners.scss';

export default class Winners extends ElemController {
  protected classes: Record<string, string>;

  protected columnNames: Record<string, string>;

  private serverAPI: ServerAPI;

  private pagination: Pagination;

  private sortByIdOrder: SortOrders;

  private sortByWinsOrder: SortOrders;

  private sortByTimeOrder: SortOrders;

  private currPage: number;

  private totalPages: number;

  private winnersPerPage: number;

  private tableContent: HTMLElement;

  private totalWinners: number;

  public currPageWinners: Winner[];

  private currPageIcons: SVGUseElement[];

  public mode: ModeNames;

  private sortOrders: Record<string, SortOrders>;

  private sortType: SortTypes;

  private sortControls: Record<string, HTMLElement>;

  private totalWinnersElem: HTMLElement;

  viewName: string;

  constructor() {
    super();

    this.classes = {
      baseClass: 'winners',
      pagination: 'winners__pagination',
      rightOrder: 'right-order',
      reverseOrder: 'reverse-order',
      control: 'winners__control',
      padgination: 'winners__pagination',
      total: 'winners__total',
      viewNameClass: 'winners__name',
    };

    this.columnNames = {
      id: 'Id',
      image: 'Image',
      name: 'Name',
      wins: 'Total wins',
      time: 'Best time (sec)',
    };

    this.viewName = 'Winners';

    this.pagination = new Pagination(
      [this.classes.pagination],
      () => this.prevPage(),
      () => this.nextPage()
    );
    this.totalWinnersElem = this.createElem('span', null, this.classes.total);
    this.winnersPerPage = 10;
    this.currPage = 1;
    this.totalPages = 1;

    this.serverAPI = ServerAPI.getInstance();

    this.sortControls = {
      id: this.createElem('th', [this.columnNames.id], [this.classes.control, this.classes.rightOrder]),
      wins: this.createElem('th', [this.columnNames.wins], this.classes.control),
      time: this.createElem('th', [this.columnNames.time], this.classes.control),
    };

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

  async renderWinners() {
    this.clear();
    const res = await this.serverAPI.getWinners(this.sortType, this.sortOrders[`${this.sortType}`], this.currPage);

    if (res?.count) {
      this.totalWinners = +res.count;
      this.updateTotalWinners(res.count);
      this.enablePagination();
    }

    if (res?.winners.length === 0 && this.currPage > 1) {
      this.prevPage();
    }

    if (res?.winners) {
      res.winners.forEach(async (winner) => {
        const carInfo = await this.serverAPI.getCar(winner.id);
        if (!carInfo) return;
        const { color, name } = carInfo;
        const tableRow = this.createWinnerRow(winner.id, color, name, winner.wins, winner.time);
        this.tableContent.append(tableRow);
        this.currPageWinners.push(winner);
      });
    }
  }

  private hydrate() {
    this.sortControls.id.addEventListener('click', () => this.sortBy(SortTypes.byId));
    this.sortControls.wins.addEventListener('click', () => this.sortBy(SortTypes.byWins));
    this.sortControls.time.addEventListener('click', () => this.sortBy(SortTypes.byTime));
  }

  sortBy(sortType: SortTypes) {
    Object.values(this.sortControls).forEach((control) => {
      control.classList.remove(this.classes.reverseOrder);
      control.classList.remove(this.classes.rightOrder);
    });

    this.sortType = sortType;
    if (this.sortOrders[this.sortType] === SortOrders.REVERS) {
      this.sortOrders[this.sortType] = SortOrders.RIGHT;
      this.sortControls[this.sortType].classList.add(this.classes.rightOrder);
    } else {
      this.sortOrders[this.sortType] = SortOrders.REVERS;
      this.sortControls[this.sortType].classList.add(this.classes.reverseOrder);
    }

    this.renderWinners();
  }

  private createTable() {
    const imageColumnHeader = this.createElem('th', [this.columnNames.image], null);
    const nameColumnHeader = this.createElem('th', [this.columnNames.name], null);
    const totalWinnersContainer = this.createElem('div', ['Total winners: ', this.totalWinnersElem], null);
    const paginationSection = this.createElem(
      'div',
      [this.pagination.getElem(), totalWinnersContainer],
      this.classes.pagination
    );

    const headersRow = this.createElem(
      'tr',
      [this.sortControls.id, imageColumnHeader, nameColumnHeader, this.sortControls.wins, this.sortControls.time],
      null
    );
    const tableHeader = this.createElem('thead', [headersRow], null);
    const table = this.createElem('table', [tableHeader, this.tableContent], null);

    const viewName = this.createElem('h4', [this.viewName], this.classes.viewNameClass);

    this.elem = this.createElem('div', [viewName, paginationSection, table], this.classes.baseClass);
  }

  private clear() {
    this.tableContent.innerHTML = '';
    this.currPageIcons.length = 0;
    this.currPageWinners.length = 0;
  }

  private createWinnerRow(id: number, imageColor: string, name: string, wins: number, time: number) {
    let usedName = name;
    if (this.mode === ModeNames.fun) {
      usedName = this.transformName(usedName);
    }
    const idCell = this.createElem('td', [String(id)], null);
    const imageCell = this.createElem('td', [this.createImage(imageColor)], null);
    const nameCell = this.createElem('td', [usedName], null);
    const winsCell = this.createElem('td', [String(wins)], null);
    const timeCell = this.createElem('td', [String(time)], null);

    const res = this.createElem('tr', [idCell, imageCell, nameCell, winsCell, timeCell], null);

    return res;
  }

  private createImage(color: string) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svgElem = document.createElementNS(svgNS, 'svg') as SVGElement;
    const useElem = document.createElementNS(svgNS, 'use') as SVGUseElement;
    const src = this.mode === ModeNames.strict ? './assets/sprite.svg#car-icon' : './assets/sprite.svg#witch-icon';
    useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
    svgElem.setAttribute('color', color);
    svgElem.setAttribute('width', '40px');
    svgElem.setAttribute('height', '40px');
    svgElem.appendChild(useElem);
    const container = this.createElem('div', [svgElem], this.classes.baseClass);

    this.currPageIcons.push(useElem);

    return container;
  }

  transformName(winnerName: string) {
    let [first, second] = [...winnerName.split(' ')];
    if (first && first in brandTransformer) {
      first = brandTransformer[first as keyof typeof brandTransformer];
    }
    if (second && second in modelTransformer) {
      second = modelTransformer[second as keyof typeof modelTransformer];
    }

    first = first === undefined ? '' : first;
    second = second === undefined ? '' : second;

    return `${first} ${second}`;
  }

  changeMode(mode: ModeNames) {
    this.mode = mode;
    this.renderWinners();
  }

  disablePagination() {
    this.pagination.disableNext();
    this.pagination.disablePrev();
  }

  enablePagination() {
    if (this.currPage > 1) {
      this.pagination.enablePrev();
    } else {
      this.pagination.disablePrev();
    }
    if (this.currPage < this.totalPages) {
      this.pagination.enableNext();
    } else {
      this.pagination.disableNext();
    }
  }

  updateTotalWinners(totalWinners: number | string | null) {
    if (!totalWinners) return;
    this.totalWinners = +totalWinners;
    this.totalPages = Math.ceil(this.totalWinners / this.winnersPerPage);
    this.totalWinnersElem.innerText = String(this.totalWinners);
  }

  nextPage() {
    if (this.currPage >= this.totalPages) return;
    this.currPage += 1;
    this.pagination.updatePageNumber(this.currPage);
    this.renderWinners();
  }

  prevPage() {
    if (this.currPage <= 1) return;
    this.currPage -= 1;
    this.pagination.updatePageNumber(this.currPage);
    this.renderWinners();
  }
}
