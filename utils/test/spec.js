import { assert, spy } from 'sinon'
import u from '../src'

describe('utils', ()=> {
	describe('callback', ()=> {
		it('calls callback on result', ()=> {
			const cb = spy()
			const ecb = spy()
			u.callback(ecb, cb)(null, 1)
			assert.calledWith(cb, 1)
			assert.notCalled(ecb)
		})
		it('calls error callback on error', ()=> {
			const cb = spy()
			const ecb = spy()
			const error = new Error()
			u.callback(ecb, cb)(error)
			assert.calledWith(ecb, error)
			assert.notCalled(cb)
		})
	})
})
