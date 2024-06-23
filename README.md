
# Fresh Corner

Proiectul este disponibil la link-ul https://github.com/ErikaRusznak/piazza-ecommerce.

## Cerințe pentru rularea aplicației

Pentru a putea rula această aplicație pe calculatorul/laptopul personal, trebuie să fie instalate următoarele tehnologii:
- Java 17
- Node.js > 18 și npm
- Maven
- Turbo (`npm install turbo --global`)

IDE-ul folosit pentru acest proiect este IntelliJ IDEA.

## Pași pentru configurarea și rularea aplicației

### Backend

1. **Setare Path pentru preluarea și încărcarea imaginilor**:
    - Se caută fișierul `application-dev.properties`.
    - Se înlocuiește path-ul existent la variabila `upload.path` cu path-ul către directorul din calculatorul dumneavoastră care să acceseze folderul `assets` din root-ul proiectului.

2. **Rularea aplicației**:
    - Se caută fișierul `ProjectApplicationWebAppEmbeddedDb` din folderul `src/test`.
    - Se rulează acest fișier.

### Frontend

1. Se deschide terminalul și se navighează în folderul de frontend:
    ```sh
    cd frontend
    ```

2. Se instalează toate dependențele necesare:
    ```sh
    npm i
    ```

3. După ce instalarea s-a terminat, se rulează următoarea comandă pentru a porni aplicațiile de frontend:
    ```sh
    npm run dev
    ```

4. Accesarea aplicațiilor se face folosind următoarele adrese:
    - Aplicația de client: [http://localhost:3000](http://localhost:3000)
    - Aplicația de producător: [http://localhost:3001](http://localhost:3001)
    - Aplicația de curier: [http://localhost:3002](http://localhost:3002)
    - Aplicația de administrator: [http://localhost:3003](http://localhost:3003)

### Observații

 - În fișierul `application.properties` din `src/main/resources` se vor găsi detaliile de conectare ale administratorului.
 - Dacă nu doriți să creați conturi noi, în fișierul `DataCreatorForTesting` din folderul `src/test` se pot vedea datele deja adăugate în baza de date.

## Baza de Date

Pentru baza de date nu este nevoie de alte configurări, deoarece se folosește H2 Database, care este gestionată de către Spring Boot.

Pentru a vedea datele din baza de date, se accesează [http://localhost:8080/h2-console](http://localhost:8080/h2-console) și completați:
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **User Name**: `sa`
