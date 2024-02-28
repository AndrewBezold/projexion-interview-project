import { expect, test } from '@jest/globals';
import { render, cleanup, screen } from '@testing-library/react';
import { LazyLoadingNodes } from './LazyLoadingNodes';

describe('Lazy loading nodes doesn\'t load nodes unless they\'re scrolled to', () => {
  beforeEach(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width: 400,
      height: 3500,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
    HTMLElement.prototype.scrollTo = () => { };
  });

  afterEach(cleanup);

  test('Nodes not scrolled to don\'t show up and current nodes do', async () => {
    const nodes = Array.from(new Array(100), (_, index) => "This is Content Node " + index);
    const setNodes = () => { };
    render(<LazyLoadingNodes nodes={nodes} setNodes={setNodes} />);
    expect(screen.getByText(nodes[3])).toBeTruthy();
    expect(screen.queryByText(nodes[70])).toBeFalsy();
  });

  // This is not scrolling and I'm not sure why yet.  Probably something inherent to jest
  // that I haven't yet discovered.
  test('Nodes scrolled to show up and nodes scrolled past don\'t', async () => {
    const nodes = Array.from(new Array(100), (_, index) => "This is Content Node " + index);
    const setNodes = () => { };
    render(<LazyLoadingNodes nodes={nodes} setNodes={setNodes} />);
    screen.getByTestId("LazyLoadingScrollDiv").scrollTo(0, 3000);
    expect(screen.queryByText(nodes[3])).toBeFalsy();
    expect(screen.getByText(nodes[70])).toBeTruthy();
  });
})

