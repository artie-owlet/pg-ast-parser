import 'mocha';
import 'chai';

import { checkStatement } from '../test-utils';

describe('Create types', () => {
	checkStatement(['DEALLOCATE identifier', 'DEALLOCATE PREPARE identifier'], {
		target: {
			name: 'identifier',
		},
		type: 'deallocate',
	});
	checkStatement(['DEALLOCATE ALL', 'DEALLOCATE PREPARE ALL'], {
		target: {
			option: 'all',
		},
		type: 'deallocate',
	});
});
