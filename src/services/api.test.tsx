import { expect, test } from '@jest/globals';
import * as api from './api';
import { email, password } from '../utils/constants';

// This has to be one test, because the second request requires the token from the first request
test('Login returns JWT tokens and ContentNode request returns ContentNodes', async () => {

  await api.login(email, password)
    .then((res) => {
      expect(res).toHaveProperty('data.Auth.loginJwt.loginResult.jwtTokens');
      return res.data.Auth.loginJwt.loginResult.jwtTokens.accessToken;
    }).then((token) => {
      return api.getContentNodes(token)
        .then((res) => expect(res).toHaveProperty('data.Admin.Tree.GetContentNodes.edges'));
    });
});
