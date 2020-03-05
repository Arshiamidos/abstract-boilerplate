import React,{Component} from 'react'
//import App from '../../src/components/App'
import TicketDatePicker from "components/reservation/ticketInfo/searchTicket/TicketDatePicker"
import Offers from "components/reservation/ticketInfo/Offers"
import renderer from 'react-test-renderer';

describe('first test with jest',()=>{
    it('should be defined and greater than zero size',()=>{
        
        expect([1,2,3]).toContain(1)
        expect([1,2,3][0]).toBe(1)
        expect([1,2,3][0]).toBeDefined()

    })
})

describe('my secound test case for strings', () => {
    it('should support strings converstion', () => {

        expect("ArashMidos").toContain('o')
        expect(['A','r','a','s','h','m','i','d','o','s']).toEqual(expect.arrayContaining([..."Arashmidos"]))

    })
})

describe('mounting App.js', () => {
    
    it('render Offers with all elements wihout crashing ', () => {
        
        const onSelectPackage=jest.fn()//offer-selector
        let mountedApp=renderer.create(
            <Offers
                Fee={{Amount:'600',CurrencyCode:'IRR'}}
                onSelectPackage={onSelectPackage}
            />
        )
        const Fee = mountedApp.root.findByType(Offers).props.Fee
        


            
        mountedApp.root.findByType('input').props.onChange()
        expect(onSelectPackage.mock.calls.length).toEqual(1)
        expect(Fee.Amount).toBe('600')

    })
})