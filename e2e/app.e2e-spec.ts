import { Angular2svgPage } from './app.po';

describe('angular2svg App', function() {
  let page: Angular2svgPage;

  beforeEach(() => {
    page = new Angular2svgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
