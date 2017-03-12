import { GradeCatPage } from './app.po';

describe('grade-cat App', () => {
  let page: GradeCatPage;

  beforeEach(() => {
    page = new GradeCatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
