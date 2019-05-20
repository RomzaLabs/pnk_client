import React from 'react';
import { shallow } from 'enzyme';
import MissionsStore from '../missionsStore';
import moxios from 'moxios';

beforeEach(() => {
  moxios.install();
  // Commented out until we have a backend.
  // moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
  //   status: 200,
  //   response: [
  //     {name: "Comment"},
  //     {name: "Second comment"}
  //   ]
  // });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of 20 missions', (done) => {
  // Attempt to render the entire app.
  // const wrapped = shallow(new MissionsStore());
  const missionsStore = new MissionsStore();
  missionsStore.getMissions();

  // Faking an API delay, the wrong way.
  setTimeout(() => {
    expect(missionsStore.missions.length).toEqual(10);
    done();
  }, 1050);

  // Fake an API delay, the right way when we have a server.
  // moxios.wait(() => {
  //   // Update
  //   wrapped.update();
  //   // Expect to find a list of comments.
  //   expect(wrapped.find('li').length).toEqual(2);
  //   // Invoke done callback
  //   done();
  //   // Cleanup
  //   wrapped.unmount();
  // });

});
