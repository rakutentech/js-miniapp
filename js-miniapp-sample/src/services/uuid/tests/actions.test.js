import { setUUID } from '../actions';
import { SET_UUID, UUID_FETCH_ERROR } from '../types';

describe('uuid actions', () => {
  test('should set UUID_FETCH_ERROR when not running in mobile environment', () => {
    const dispatch = jest.fn();
    setUUID()(dispatch);
    expect(dispatch).toBeCalledWith({
      type: UUID_FETCH_ERROR,
    });
  });
});
