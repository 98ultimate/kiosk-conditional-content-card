# kiosk-conditional-content-card

This is example lovelace card to use with homeassistant / alarmo-card. It will simply list open sensors with conditional card.

Example lovelace yaml to use with homeassistant:

    card:
        entities:
        - binary_sensor.sensor1
        - binary_sensor.doorsensor1
        - binary_sensor.movesonsor1
        - binary_sensor.movesonsor2
        - binary_sensor.movesonsor3
        state_filter:
            - 'on'
        type: entity-filter
        card:
            type: custom:kiosk-conditional-content-card
            show_name: true
            show_icon: false
            show_state: true
    conditions:
        - entity: alarm_control_panel.alarmo
          state: disarmed
    type: conditional
