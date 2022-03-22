import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Title from '..';

describe('test title', () => {
  it('should render major and minor content', () => {
    const major = 'this is major';
    const minor = 'this is minor';

    const { container } = render(<Title major={major} minor={minor} />);

    screen.getByText(major);
    screen.getByText(minor);
    expect(container).toMatchSnapshot();
  });

  it('should render link content', () => {
    const major = 'this is major';
    const minor = 'this is minor';
    const link = <span>this is link</span>;

    const { container } = render(<Title major={major} minor={minor} link={link} />);

    screen.getByText(major);
    screen.getByText(minor);
    screen.getByText('this is link');
    expect(container).toMatchSnapshot();
  });
});
