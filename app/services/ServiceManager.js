export default class ServiceManagerClass  {

    constructor(instaFacade) {
        this.instaFacade = instaFacade;
    }

    invoke(serviceDelegate, accessToken) {
        
        var accessTokenParam = '/?access_token=' + (accessToken ? accessToken : this.instaFacade.getCurrentSession().access_token);
        var serviceUrl = this.instaFacade.config.rootApiUrl + serviceDelegate.getUrl() + accessTokenParam;
        
        return fetch(
            serviceUrl,
            {
              method: serviceDelegate.getVerb(),
              headers: {
                'Accept': 'application/json',
              },
              body: serviceDelegate.getBody()
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
             return jsonResponse.data;
        });
    }
}