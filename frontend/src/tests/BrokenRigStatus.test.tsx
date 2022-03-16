import React from 'react';
import { render, screen } from '@testing-library/react';
import RigStatus from '../components/BrokenRigStatus';
import { IRigStatus } from '../models';

const rig: IRigStatus = {
  id: "1",
  name: "test rig",
  framerate: 15,
  status: "ready",
}

describe("RigStatus Tests", () => {
  test('Renders Correct Framerate', () => {
    render(<RigStatus rig={rig} />);
    const framerateElement = screen.getByTestId("framerate");
    expect(framerateElement).toHaveTextContent(rig.framerate.toString());
  });
})

