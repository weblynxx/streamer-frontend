import { Commit } from 'vuex';

function error(text: any, commit: Commit, error?: any, logger?: any) {
  if (error && logger) logger.error(error);
  commit('showError', text, { root: true });
}
function ok(text: any, commit: Commit, logger?: any) {
  if (logger) logger.debug(`success: ${text} [${text}]`);
  commit('showSuccess', text, { root: true });
}
export default {
  error: error,
  ok: ok,
};
