**D&D Spellbook Applicatie (Frontend)**

**Link naar GitHub-repository:** https://github.com/Ralph-Beentjes/dnd-spellbook-eindopdracht-novi-frontend

**Inleiding:**

De D&D Spellbook applicatie heeft als doel om gebruikers een overzichtelijk en makkelijke methode te bieden voor hun spells in Dungeons & Dragons. Met de frontend-applicatie kunnen spelers Spellbooks maken voor hun personages (en een bijbehorende avatar uploaden en downloaden), spells toevoegen/verwijderen en via één pagina hun spells inzien. Ook kunnen gebruikers hun Spellbook delen met anderen via een Share-knop. Via de web-API worden gebruikersprofielen, Spellbooks, spells, classes en shares aangemaakt, indien nodig bijgewerkt en verwijderd. De gegevens worden via de web-API opgeslagen in een PostgreSQL-database.

**Inhoudsopgave:**

- Benodigdheden
- Projectstructuur en technieken
- Stappenplan
- Uitvoeren tests

**Benodigdheden:**

- IDE voor Java-projecten (zoals IntelliJ IDEA)
- IDE voor JavaScript-projecten (zoals Webstorm)
- Keycloak
- PostgreSQL
- PgAdmin 4
- Postman

**Projectstructuur en technieken:**

Projectstructuur:

![](https://i.postimg.cc/8Tt7qkCw/projectstructuur-frontend.png)

Technieken en frameworks:

- React (versie 19.2.4)
- Vite
- Node.js en npm
- React Router
- Axios
- Keycloak-js
- JWT-decode

**Stappenplan:**

- Bij het installeren van PostgreSQL kies de username en password die staan in het application.properties-bestand van de backend-applicatie (spring.datasource.username en spring.datasource.password)
- Start PgAdmin 4 op en maak een nieuwe database aan met de naam ‘dnd-spellbook’
- Open de backend-applicatie met de IDE naar keuze en start vervolgens de applicatie op
- Importeer de Keycloak Realm uit de .zip-file met de naam dnd-spellbook-realm.json met dit commando:
- bin\kc.bat import --dir **directory-hier** (Windows)
- bin/kc.sh import --dir **directory-hier** (Mac/Linux)
- Start de Keycloak-server door dit commando in te voeren en op enter te drukken: 
- bin\kc.bat start-dev --http-port 9090 (Windows)
- bin/kc.sh start-dev --http-port 9090 (Mac/Linux)
- Open de frontend-applicatie met de IDE naar keuze en installeer de benodigde libraries met het commando npm install (doe dit handmatig en niet automatisch met Webstorm)
- Start de frontend-applicatie op met het commando npm run dev
De applicatie is nu te gebruiken op http://localhost:5173/ in de browser
- (Optioneel) Als de database problemen geeft bij het opstarten na de eerste keer, verander 'spring.sql.init.mode=always' in application.properties in de backend application naar '=never'



**Uitvoeren tests:**

Tests voor de backend kunnen uitgevoerd worden middels Postman. De requests kunnen gestuurd worden naar http://localhost:8080 en de bijbehorende API-requests kunnen gevonden worden in de API-documentatie.

Voor de frontend kan de applicatie getest worden op http://localhost:5173/ wanneer de backend, Keycloak-server en frontend draaien. Er kan ingelogd worden met de volgende gebruikers:

- **Username:** testuser
- **Email:** testuser@example.com
- **Wachtwoord:** password
- **Rol:** USER


- **Username:** testadmin
- **Email:** testadmin@example.com
- **Wachtwoord:** password
- **Rol:** ADMIN

