**Link zur Anwendung:**
https://refill.wdl-analytics.com/

_tl;dr:_
Die Plattform **Refill** unterstützt die Planung der Durchführung von mobilen Blutspenden.
Bürger tragen ihre Bereitschaft zum Blutspenden auf einer Landkarte ein. Diese Karte wird beispielsweise dem DRK zwecks Planung des Einsatzes der mobilen Blutspendezentren zur Verfügung gestellt.
Ebenso werden Bürger über bereits geplante, zu ihren Präferenzen passenden Blutspenden informiert.

# Die Herausforderung

> »Es ist eine besonders fatale Begleiterscheinung der aktuell grassierenden Corona-Epidemie: Blutkonserven werden landesweit bedenklich knapp.« 
>
> *[Saarbrücker Zeitung](https://www.saarbruecker-zeitung.de/saarland/merzig-wadern/merzig/fuenf-termine-zur-blutspende-im-kreis-merzig-wadern-in-den-kommenden-tagen_aid-49584991)*

Neben dem enormen Bedarf an Personal stellt COVID-19 die Gesundheitssysteme der Länder dieser Welt vor weitere Probleme.
Einige medizinische Eingriffe für - auch abseits von COVID-19 - schwerkranke Menschen sind unumgänglich und müssen durchgeführt werden.
Hierzu ist zwingend erforderlich, dass für diesen Notbetrieb des Gesundheitssystems genügend Blutkonserven zur Verfügung stehen.
Leider führt die Angst der Menschen vor der aktuellen Situation dazu, dass weniger Menschen Blut spenden.
Ebenso wird es für Krankenhäuser zunehmend schwerer, den normalen Blutspendedienst aufrecht zu erhalten.

# Unsere Lösung

> »Wir müssen jetzt, so lange die meisten potenziellen Spenderinnen und Spender noch gesund sind, unsere Lager an Blutkonserven auffüllen.«
>
> *[Universitätsklinikum Halle](https://www.mdr.de/nachrichten/panorama/blut-spende-corona-100.html)*

Refill unterstützt das Gesundheitswesen, indem es eine effiziente Planung des Einsatzes mobiler Blutspendeeinrichtungen ermöglicht.
Die Plattform unterstützt dabei, indem sie die Blutspendebereitschaft der Bevölkerung lokationsbasiert visualisiert.
Somit kann die Auslastung der mobilen Blutspendeeinrichtungen erhöht und die Versorgungssituation für das Gesundheitssystem verbessert werden.

Wie funktioniert das?
Um zu verstehen wie die Plattform ihren Nutzen entfaltet, werden im folgenden die zwei Nutzergruppen erläutert:

* **Blutspender**:
        Bürger, die gerne eine Blutspende vornehmen möchten, können auf der Plattform eine Art Blutspendeangebot einstellen, nachdem Sie den Standardfragebogen zur Blutspende erfolgreich ausgefüllt haben.
        Hierzu teilen Sie auf der Plattform neben terminlichen Präferenzen und ihrem Standort auch einen Radius um ihren Standort mit, in welchem sie sich zwecks Blutspende bewegen würden.
        Zunächst werden in der Nähe befindliche, bereits geplante Möglichkeiten zum Blutspenden dargestellt.
        Ferner erhält der Blutspender eine Benachrichtigung, wenn passend zu seinen Präferenzen in seinem Umfeld eine mobile Blutspende geplant wird.
        Jeder Nutzer kann nur die von ihm persönlich eingestellten Daten einsehen.

* **Blutsammler**:
        Institutionen können auf die von den Blutspendern eingestellten Daten zugreifen und auf Basis dieser Daten ihre Touren planen.
        Auf einer intuitiven Kartenansicht wird die Blutspendebereitschaft visualisiert. 
        Dem Sachverständigen wird die Möglichkeit geboten, Einsätze mit einem Blutspendemobil unter Angabe des Ortes, eines Einzugsradius sowie der geplanten Zeiten zu simulieren.
        
Die simple und strikte Benutzung der Plattform unterstreicht den Gedanken, die vorhandenen Ressourcen, gerade in der aktuellen Situation, effizient einzusetzen.

**Status**

Die Anwendung wurde in Docker Microservices entwickelt und auf Azure deployed. So können wir gewährleisten, dass wir in kurzer Zeit vom PoC Ressourceneinsatz für wenige Anwender zur Veranschaulichung, auf einen potentiell globalen Einsatz mit sehr hohen Nutzerzahlen wechseln können.

Das Frontend wurde mit Angular 9 als Progressive Web App umgesetzt und bietet alle Funktionalitäten zur dynamischen Planung von Blutspendeterminen, um Blutspender und Blutsammler zusammen zu bringen. Mit Rücksicht auf unsere multikulturelle Gesellschaft und die Möglichkleit die Anwendung problemlos in mehreren Ländern einzusetzen, haben wir bereits für den Prototypen die Sprachen deutsch, englisch und französisch implementiert. Weitere Sprachen lassen sich über einfache JSON Files bequem hinzufügen. Die bereits fest angebotenen Blutspendetermine, welche in der Anwendung dargestellt sind, werden automatisiert über Crawler und Requests erfasst.

Das Backend bildet eine fertige Nodejs Express Anwendung zur Nutzerverwaltung, Erfassung von Terminen und E-Mail Versand.

Eine MongoDB zur Datenspeicherung und Realisierung der GEO-Queries macht den MEAN-Stack der Anwendung komplett.

Die Vorbereitung der Geoinformationen übernimmt ein Python Service.

Grundsätzlich ließe sich die Anwendung mit einer leicht geänderten Azure Architektur in ihrem jetzigen Zustand schon produktiv in Deutschland betreiben. Man müsste noch einmal die Übersetzungen prüfen und noch ein wenig Zeit in automatisierte Tests und deployment pipelines stecken. Außerdem könnte die mobile Ansicht noch polish vertragen.

# Erweiterungen

> Haben Patienten eine COVID-19-Infektion überstanden - weltweit sind dies bereits rund 80.000 - dann enthält ihr Blutserum eine Vielzahl unterschiedlichster Antikörper, die das Coronavirus effektiv bekämpfen können.
>
> *[Deutsche Welle](https://www.dw.com/de/mit-medikamenten-aus-antik%C3%B6rpern-gegen-corona/a-52804320)*

**Andere Einsatzzwecke**

Grundsätzlich kann die Anwendung auch für grundlegend ähnliche Einsatzzwecke verwendet werden. Sobald ein ungewisser Bedarf bei Bürgern entsteht, der durch eine zentrale Stelle gedeckt werden soll oder kann. Beispielsweise die bedarfsgerechte Lieferung von Kleidung, Impfstoffen oder Lebensmitteln. Oder man denkt einmal komplett über den Tellerrand und setzt die Anwendung ein, damit Leute Pfandflaschen anbieten, die Sammler dann zu Hause abholen können, um die Recycling-Kette aufrecht zu halten.

**Mögliche Erweiterungen für die Zukunft:**

* **SARS-CoV-2 Antikörper**:
        Patienten, welche die COVID-19 Erkrankung überstanden haben könnten diese Information ebenfalls auf der Plattform hinterlegen.
        Somit könnten zu Zwecken der Forschung gezielt Blutkonserven für die Forschung an Antikörpern gesammelt werden.

* **Feingranularere Terminplanung**:
        Wird eine neue mobile Blutspende geplant, wird automatisiert ein Zeitplan für die Spender erstellt. Somit erhalten die Spender eine genaue Zeitangabe, wann sie ihre Spende leisten können.

* **Blutgruppen**:
        Eine denkbare Erweiterung ist die zusätzliche Angabe der angebotenen / benötigten Blutgruppen.
        Dieses Feature würde der Plattform die Mächtigkeit bieten, noch gezielter auf Bedarfssituationen von Blutkonserven eingehen zu können.

* **Spenden-Heatmap**:
        Beiden Benutzergruppen könnte eine Karte bereitgestellt werden, welche die Spendenbereitschaft in Form einer Heatmap darstellt.

* **Proaktive Vorschläge**:
        Die Plattform könnte der Gruppe der Blutsammler Vorschläge unterbreiten, an welchen Orten und zu welchen Zeiten sie ihre Ressourcen am effizientesten einsetzen können.
