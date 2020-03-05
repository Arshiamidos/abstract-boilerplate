const axiosMock =jest.genMockFromModule('axios')
let mockResponse={
    data:{
        shops:[
            {
                location:'LA. USA',
                address: 'St down riders'
            }
        ]
    }
}
axiosMock.get.mockImplementation(req)
function req(){
    return new Promise(function(resolve){
        axiosMock.delayTimer=setTimeout(() => {
            resolve(mockResponse)
        }, 1000);
    })
}
module.exports=axiosMock