import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HarmonicTessellations from './HarmonicTessellations';

describe('HarmonicTessellations', () => {
  describe('initialization', () => {
    it('initializes the system managers', () => {
      const { getByText } = render(<HarmonicTessellations />);
      expect(getByText('Failed to initialize system components')).not.toBeInTheDocument();
    });

    it('handles initialization errors', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { getByText } = render(<HarmonicTessellations />);
      expect(getByText('Failed to initialize system components')).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('animation loop', () => {
    it('generates new patterns while playing', () => {
      const { rerender } = render(<HarmonicTessellations />);
      expect(screen.queryByTestId('pattern')).not.toBeInTheDocument();

      // Start playing
      fireEvent.click(screen.getByText('Play'));
      rerender(<HarmonicTessellations />);
      expect(screen.getByTestId('pattern')).toBeInTheDocument();
    });

    it('stops generating patterns when not playing', () => {
      const { rerender } = render(<HarmonicTessellations />);

      // Start playing
      fireEvent.click(screen.getByText('Play'));
      rerender(<HarmonicTessellations />);
      expect(screen.getByTestId('pattern')).toBeInTheDocument();

      // Stop playing
      fireEvent.click(screen.getByText('Pause'));
      rerender(<HarmonicTessellations />);
      expect(screen.queryByTestId('pattern')).not.toBeInTheDocument();
    });

    it('updates the pattern on complexity change', () => {
      const { rerender } = render(<HarmonicTessellations />);

      // Start playing
      fireEvent.click(screen.getByText('Play'));
      rerender(<HarmonicTessellations />);
      const initialPattern = screen.getByTestId('pattern');

      // Change complexity
      fireEvent.change(screen.getByLabelText('Complexity'), { target: { value: 5 } });
      rerender(<HarmonicTessellations />);
      const updatedPattern = screen.getByTestId('pattern');
      expect(updatedPattern).not.toEqual(initialPattern);
    });

    it('updates the pattern on transformation change', () => {
      const { rerender } = render(<HarmonicTessellations />);

      // Start playing
      fireEvent.click(screen.getByText('Play'));
      rerender(<HarmonicTessellations />);
      const initialPattern = screen.getByTestId('pattern');

      // Change transformation
      fireEvent.change(screen.getByLabelText('Transformation'), { target: { value: 'scale' } });
      rerender(<HarmonicTessellations />);
      const updatedPattern = screen.getByTestId('pattern');
      expect(updatedPattern).not.toEqual(initialPattern);
    });
  });

  describe('audio', () => {
    it('schedules notes when playing and not muted', () => {
      const { rerender } = render(<HarmonicTessellations />);

      // Start playing
      fireEvent.click(screen.getByText('Play'));
      rerender(<HarmonicTessellations />);
      // TODO: Add assertions to check that notes are scheduled

      // Mute audio
      fireEvent.click(screen.getByText('Mute'));
      rerender(<HarmonicTessellations />);
      // TODO: Add assertions to check that notes are not scheduled
    });
  });

  describe('error handling', () => {
    it('displays an error message on initialization failure', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const { getByText } = render(<HarmonicTessellations />);
      expect(getByText('Failed to initialize system components')).toBeInTheDocument();
      console.error.mockRestore();
    });

    it('provides a reload button on error', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const { getByText } = render(<HarmonicTessellations />);
      fireEvent.click(getByText('Reload'));
      expect(window.location.reload).toHaveBeenCalled();
      console.error.mockRestore();
    });
  });
});