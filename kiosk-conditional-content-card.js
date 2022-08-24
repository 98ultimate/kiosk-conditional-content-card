class KioskConditionalContentCard extends HTMLElement {
    // Whenever the state changes, a new `hass` object is set. Use this to
    // update your content.
    set hass(hass) {
      // Initialize the content if it's not there yet.
      if (!this.content) {
        this.innerHTML = `
          <ha-card>
            <div class="card-content"></div>
          </ha-card>
        `;
        this.content = this.querySelector('div');
      }
  
      console.log(hass)

      let html = '<b>Active items:</b><br/><br/>'

      if (this.config.entities.length > 0) {
        this.config.entities.forEach(element => {
          const entityId = element.entity;
          const name = hass.states[entityId].attributes.friendly_name;
          const state = hass.states[entityId];
          let stateStr = undefined
          console.log(hass.states[entityId].attributes.device_class)
          if ( state && state.state ) {
            if (hass.states[entityId].attributes.device_class == "door" ) {
              stateStr = 'open'
              html = `${html}<ha-icon style="color:inherit" icon="mdi:door-open"></ha-icon> `
              html = `${html}<b>${name}</b> is ${stateStr}!<br/>`
            }
            else {
              stateStr = 'active'
              html = `${html}<ha-icon style="color:inherit" icon="hue:motion-sensor-movement"></ha-icon> `
              html = `${html}<b>${name}</b> is ${stateStr}!<br/>`
            }
          }
        });
      }
      else {
        html = '<b>Nothing active</b>'
      }

      this.content.innerHTML = `
        ${html}
      `;        

    }
  
    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    setConfig(config) {
      // if (!config.entity) {
      //   throw new Error('You need to define an entity');
      // }
      this.config = config;
    }
  
    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define('kiosk-conditional-content-card', KioskConditionalContentCard);
