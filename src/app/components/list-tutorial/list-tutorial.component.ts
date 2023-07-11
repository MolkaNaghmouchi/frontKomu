import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Theme } from 'src/app/models/theme';
import { Tutorial } from 'src/app/models/tutorial';
import { ThemeService } from 'src/app/service/theme.service';
import { TutorialserviceService } from 'src/app/service/tutorialservice.service';

@Component({
  selector: 'app-list-tutorial',
  templateUrl: './list-tutorial.component.html',
  styleUrls: ['./list-tutorial.component.scss']
})
export class ListTutorialComponent implements OnInit {
  selectedCities : any
 tutorialDialog: boolean;
    deleteTutorialDialog: boolean = false;
    deleteTutorialsDialog: boolean = false;
  
    submitted: boolean;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];
    tutorial: Tutorial = {
      
      title: '',
      description: '',
      themes:{}
    };
    selectedTutorials: Tutorial[];
    tutorials: Tutorial[];
    themes: Theme[] = []; 
    id_theme: any;

  
    constructor(
      private tutorialService: TutorialserviceService,
      private messageService: MessageService,
      private themeService: ThemeService,
     
    ) {}
  
    ngOnInit() {
      this.cols = [
        { field: 'title', header: 'Title' },
        { field: 'description', header: 'Description' },
        { field: 'themes', header: 'theme' } // Ajout de la colonne 'Theme'
      ];
      this.loadTutorials();
      this.retrieveThemes(); // Appel de la fonction pour récupérer les themes
    }
  
    loadTutorials() {
      this.tutorialService.getAll().subscribe(tutorials => {
        this.tutorials = tutorials; // Utilisation de la variable 'tutorials' reçue dans le callback

      });
    }
  
    retrieveThemes(): void {
      this.themeService.getAll().subscribe({
        next: (data) => {
          this.themes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  
    openNew(): void {
      this.tutorial = { title: '', description: '', themes: {} };
      this.submitted = false;
      this.tutorialDialog = true;
    }
  
    deleteSelectedTutorials(): void {
      this.deleteTutorialsDialog = true;
    }
  
    editTutorial(tutorial: Tutorial): void {
      this.tutorial = { ...tutorial };
      this.tutorialDialog = true;
      this.id_theme = tutorial.themes?.id; 
    }
  
    deleteTutorial(tutorial: Tutorial): void {
      this.deleteTutorialDialog = true;
      this.tutorial = { ...tutorial };
    }
  
    confirmDeleteSelected() {
      this.deleteTutorialsDialog = false;
      this.tutorialService.delete(this.selectedTutorials.map(tutorial => tutorial.id)).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tutorials Deleted',
          life: 3000
        });
        this.selectedTutorials = null;
        this.loadTutorials();
      });
    }
  
    confirmDelete(): void {
      this.deleteTutorialDialog = false;
      this.tutorialService.delete(this.tutorial.id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tutorial Deleted',
          life: 3000
        });
        this.loadTutorials();
      });
      this.tutorial = { title: '', description: '', themes: {} };
    }
  
    hideDialog(): void {
      this.tutorialDialog = false;
      this.submitted = false;
    }
  
    saveTutorial(): void {
      this.submitted = true;
      var items = []
    for(let i=0 ;i< this.selectedCities.length ; i++){
      items.push(this.selectedCities[i])
    }
    
      const data = {
        id: this.tutorial.id,
  
        title: this.tutorial.title,
        description: this.tutorial.description,
        //themes: this.id_theme
        themeIds:items
      };
    
      if (this.tutorial.id) {
        // Update existing tutorial
        this.tutorialService.update(this.tutorial.id, this.id_theme, data).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tutorial Updated',
              life: 3000
            });
            this.loadTutorials();
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        // Create new tutorial
        this.tutorialService.create(data).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tutorial Created',
              life: 3000
            });
            this.loadTutorials();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    
      this.tutorialDialog = false;
    }
    
    
  
  }