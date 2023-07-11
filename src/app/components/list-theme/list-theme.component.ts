import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Theme } from 'src/app/models/theme';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss']
})
export class ListThemeComponent implements OnInit {

 
    themeDialog: boolean;
    deleteThemeDialog: boolean = false;
    deleteThemesDialog: boolean = false;
    selectedThemeId: any;
    theme: Theme = { id: '1', nom: '' };
    selectedThemes: Theme[];
    submitted: boolean;
    cols: any[];
    rowsPerPageOptions = [5, 10, 20];
  
    constructor(
      private themeService: ThemeService,
      private messageService: MessageService,
   
    ) {}
    themes?: Theme[];
    id_theme!:any;
  
    ngOnInit() {
      this.cols = [
        { field: 'nom', header: 'Nom' }
      ];
  
      this.loadThemes();
    }
  
    loadThemes() {
      this.themeService.getAll().subscribe(themes => {
        this.themes = themes;

      });
    }
  
    openNew() {
      this.theme = { id: '', nom: '' };
      this.submitted = false;
      this.themeDialog = true;
    }
  
    deleteSelectedThemes() {
      this.deleteThemesDialog = true;
    }
  
    editTheme(theme: Theme) {
      this.theme = { ...theme };
      this.selectedThemeId = theme.id;
      this.themeDialog = true;
    }
  
    deleteTheme(theme: Theme) {
      this.deleteThemeDialog = true;
      this.selectedThemeId = theme.id; // Stockez l'ID du thème sélectionné
    }
  
    confirmDeleteSelected() {
      this.deleteThemesDialog = false;
      this.themeService.delete(this.selectedThemes.map(theme => theme.id)).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Themes Deleted',
          life: 3000
        });
        this.selectedThemes = null;
        this.loadThemes();
      });
    }
  
    confirmDelete() {
      this.deleteThemeDialog = false;
      this.themeService.delete(this.selectedThemeId).subscribe(() => { // Utilisez selectedThemeId pour la suppression
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Theme Deleted',
          life: 3000
        });
        this.loadThemes();
      });
      this.theme = { id: '', nom: '' };
    }
  
    hideDialog() {
      this.themeDialog = false;
      this.submitted = false;
    }
  saveTheme(): void {
    this.submitted = true;
  
    const data = {
      id: this.selectedThemeId,
      nom: this.theme.nom
    };
  
    if (this.theme.id) {
      // Update existing theme
      this.themeService.update(this.selectedThemeId,data).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Theme Updated',
            life: 3000
          });
          this.loadThemes();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Create new type
      this.themeService.createTheme(data).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Type Created',
            life: 3000
          });
          this.loadThemes();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    this.themeDialog = false;
  }
  
    
  
  
   
  
   
  }