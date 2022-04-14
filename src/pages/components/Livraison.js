import React, {useEffect, useState}  from 'react';

const Livraison = (props) => {
    const [error,setError] = useState("")
    let autocomplete;
    let address1Field;
    let address2Field;
    let postalField;
    const google = window.google;

    function initAutocomplete() {
    address1Field = document.querySelector("#in6");
    postalField = document.querySelector("#in8");
    // Create the autocomplete object, restricting the search predictions to
    // addresses in the US and Canada.
    autocomplete = new google.maps.places.Autocomplete(address1Field, {
        componentRestrictions: { country: ["fr", "ca"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddress);
    }

    initAutocomplete()
    function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
        case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
        }

        case "route": {
            address1 += component.short_name;
            break;
        }

        case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
        }

        case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
        }
        case "locality":
            document.querySelector("#in7").value = component.long_name;
            break;
        case "administrative_area_level_1": {
            console.log("0000")
            break;
        }
        case "country":
            document.querySelector("#in9").value = component.long_name;
            break;
        }
    }

    address1Field.value = address1;
    postalField.value = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    }

    const [u,setU] = useState({id:0,user:{first_name:"",last_name:""}})
    console.log('u u u u u u  u  u u  u u u',u)
    const getCSRF = async () => {
    var url2 = "http://localhost:8000/csrf/"
    let r = '' 
    await fetch(url2, {
        credentials: 'include',
      }).then(response => {
        if(response.ok) {
            console.log("fetchCSRF")
            r = response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        })
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
    return r
    }

    useEffect(async () => {
        let t = async () => {
            var url = "http://localhost:8000/current_user/?format=json"
            let r = await getCSRF()
            const csrftoken = r.csrfToken
            let data = await fetch(url,{                
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            }, 
            credentials: 'include',
            }).then(response => {
            if(response.ok) {
                console.log("current_user ttt",response)
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                {
                  return(data)
                }
                )
            .catch(function(error) {
              console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
            setU(data)
          }
          await t()
        return () => {
        };
    }, [u.id]);
    const user = (
        props.user
        ?
            props.user
        :
            {
                prenom:"",
                nom:"",
                email:"",
                adresse:"",
                ville:"",
                code_postal:"",
                pays:"",
                telephone:""
            }
    )
    return (

        <div class="commandeStep w-100 justify-content-center align-items-center">
            <h4 class="commandStepTitre text-center mt-4">
                Adresse de livraison
            </h4>
            {
                u!='rien trouvé'
                ?
                    <div class="commandeStepContenu pb-5 d-flex flex-column justify-content-center align-items-center">
                        <div class="livraison">

                            <div class="d-flex justify-content-between align-items-center w-100">
                                <div class="formrow me-2">
                                    <input id="in1" type="text" name='prenom' class="inputform" defaultValue={u.user.first_name} required/>
                                        <label for="in1" class="labelform">Prénom*</label>
                                </div>
                                <div class="formrow ms-2">
                                    <input id="in2" type="text" name='nom' class="inputform" defaultValue={u.user.last_name}  required/>
                                        <label for="in2" class="labelform">Nom*</label>
                                </div>
                            </div>
                            <div class="formrow w-100">
                                <input id="in3" type="email" name='email' class="inputform" defaultValue={u.user.email} disabled  required/>
                                    <label for="in3" class="labelform">Email*</label>
                            </div>

                            <div class="formrow w-100">
                                <input id="in6" type="text" name='adresse' class="inputform" defaultValue={u.adresse} autocomplete="off"  required/>
                                    <label for="in6" class="labelform">Adresse*</label>
                            </div>

                            <div class="d-flex justify-content-between align-items-center w-100">
                                <div class="formrow me-2">
                                    <input id="in7" type="text" name='ville' class="inputform " defaultValue={u.ville}  required/>
                                        <label for="in7" class="labelform">Ville*</label>
                                </div>
                                <div class="formrow ùs-2">
                                    <input id="in8" type="text" name='cp' class="inputform " value={u.code_postal}  required/>
                                        <label for="in8" class="labelform">Code postal*</label>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between align-items-center w-100">
                                <div class="formrow me-2">
                                    <input id="in9" type="text" name='pays' class="inputform " defaultValue={u.pays}  required/>
                                        <label for="in9" class="labelform">Pays*</label>
                                </div>
                                <div class="formrow ms-2">
                                    <input id="in10" type="text" name='telephone' class="inputform " defaultValue={u.telephone}  required/>
                                        <label for="in10" class="labelform">Téléphone</label>
                                </div>
                            </div>
                            <p className="text-danger">
                                {error}
                            </p>
                        </div>
                        {props.button}
                    </div>
                :
                <div class="commandeStepContenu pb-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="livraison">

                        <div class="d-flex justify-content-between align-items-center w-100">
                            <div class="formrow me-2">
                                <input id="in1" type="text" name='prenom' class="inputform" required/>
                                    <label for="in1" class="labelform">Prénom*</label>
                            </div>
                            <div class="formrow ms-2">
                                <input id="in2" type="text" name='nom' class="inputform" required/>
                                    <label for="in2" class="labelform">Nom*</label>
                            </div>
                        </div>
                        <div class="formrow w-100">
                            <input id="in3" type="email" name='email' class="inputform" required/>
                                <label for="in3" class="labelform">Email*</label>
                        </div>

                        <div class="formrow w-100">
                            <input id="in6" type="text" name='adresse' class="inputform" placeholder=' ' autocomplete="off"  required/>
                                <label for="in6" class="labelform">Adresse*</label>
                        </div>

                        <div class="d-flex justify-content-between align-items-center w-100">
                            <div class="formrow me-2">
                                <input id="in7" type="text" name='ville' class="inputform " required/>
                                    <label for="in7" class="labelform">Ville*</label>
                            </div>
                            <div class="formrow ùs-2">
                                <input id="in8" type="text" name='cp' class="inputform " required/>
                                    <label for="in8" class="labelform">Code postal*</label>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center w-100">
                            <div class="formrow me-2">
                                <input id="in9" type="text" name='pays' class="inputform " required/>
                                    <label for="in9" class="labelform">Pays*</label>
                            </div>
                            <div class="formrow ms-2">
                                <input id="in10" type="text" name='telephone' class="inputform " required/>
                                    <label for="in10" class="labelform">Téléphone</label>
                            </div>
                        </div>
                        <p className="text-danger">
                            {error}
                        </p>
                    </div>
                {props.button}
                </div>
            }

        </div>
    );
}

export default Livraison;
