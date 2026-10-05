import type { CrmMessages } from "./englishCrmMessages";

export const spanishCrmMessages = {
  resources: {
    companies: {
      name: "Empresa |||| Empresas",
      forcedCaseName: "Empresa",
      fields: {
        name: "Nombre de la empresa",
        website: "Sitio web",
        linkedin_url: "URL de LinkedIn",
        phone_number: "Teléfono",
        created_at: "Creada el",
        nb_contacts: "Número de contactos",
        revenue: "Facturación",
        sector: "Sector",
        size: "Tamaño",
        tax_identifier: "Identificador fiscal",
        address: "Dirección",
        city: "Ciudad",
        zipcode: "Código postal",
        state_abbr: "Provincia",
        country: "País",
        description: "Descripción",
        context_links: "Enlaces de contexto",
        sales_id: "Responsable de cuenta",
      },
      empty: {
        description: "Parece que tu lista de empresas está vacía.",
        title: "No se encontraron empresas",
      },
      import: {
        title: "Importar empresas",
      },
      field_categories: {
        contact: "Contacto",
        additional_info: "Información adicional",
        address: "Dirección",
        context: "Contexto",
      },
      action: {
        create: "Crear empresa",
        edit: "Editar empresa",
        new: "Nueva empresa",
        show: "Ver empresa",
      },
      added_on: "Añadida el %{date}",
      followed_by: "Seguida por %{name}",
      followed_by_you: "Seguida por ti",
      no_contacts: "Sin contactos",
      nb_contacts: "%{smart_count} contacto |||| %{smart_count} contactos",
      nb_deals:
        "%{smart_count} oportunidad |||| %{smart_count} oportunidades",
      sizes: {
        one_employee: "1 empleado",
        two_to_nine_employees: "2-9 empleados",
        ten_to_forty_nine_employees: "10-49 empleados",
        fifty_to_two_hundred_forty_nine_employees: "50-249 empleados",
        two_hundred_fifty_or_more_employees: "250 empleados o más",
      },
      autocomplete: {
        create_error: "Ocurrió un error al crear la empresa",
        create_item: "Crear %{item}",
        create_label: "Empieza a escribir para crear una nueva empresa",
      },
    },
    contacts: {
      name: "Contacto |||| Contactos",
      forcedCaseName: "Contacto",
      field_categories: {
        background_info: "Información de contexto",
        identity: "Identidad",
        misc: "Varios",
        personal_info: "Información personal",
        position: "Cargo",
      },
      fields: {
        first_name: "Nombre",
        last_name: "Apellidos",
        last_seen: "Última vez visto",
        title: "Cargo",
        company_id: "Empresa",
        email_jsonb: "Direcciones de correo",
        email: "Correo electrónico",
        phone_jsonb: "Teléfonos",
        phone_number: "Teléfono",
        linkedin_url: "URL de LinkedIn",
        background: "Información de contexto (bio, cómo os conocisteis, etc.)",
        has_newsletter: "Recibe boletín",
        sales_id: "Responsable de cuenta",
      },
      action: {
        add: "Añadir contacto",
        add_first: "Añade tu primer contacto",
        create: "Crear contacto",
        edit: "Editar contacto",
        export_vcard: "Exportar a vCard",
        new: "Nuevo contacto",
        show: "Ver contacto",
      },
      background: {
        last_activity_on: "Última actividad el %{date}",
        added_on: "Añadido el %{date}",
        followed_by: "Seguido por %{name}",
        followed_by_you: "Seguido por ti",
        status_none: "Ninguno",
      },
      position_at: "%{title} en",
      position_at_company: "%{title} en %{company}",
      empty: {
        description: "Parece que tu lista de contactos está vacía.",
        title: "No se encontraron contactos",
      },
      import: {
        title: "Importar contactos",
      },
      inputs: {
        genders: {
          male: "Él",
          female: "Ella",
          nonbinary: "Elle",
        },
        personal_info_types: {
          work: "Trabajo",
          home: "Casa",
          other: "Otro",
        },
      },
      list: {
        error_loading: "Error al cargar los contactos",
      },
      bulk_tag: {
        action: "Etiquetar",
        back: "Volver a las etiquetas",
        create_description:
          "Crea una nueva etiqueta y aplícala a los contactos seleccionados.",
        description:
          "Elige una etiqueta existente o crea una nueva para los contactos seleccionados.",
        empty:
          "Aún no hay etiquetas. Crea una para etiquetar los contactos seleccionados.",
        error: "No se pudo añadir la etiqueta a los contactos",
        noop: "Los contactos seleccionados ya tienen esta etiqueta",
        success:
          "Etiqueta añadida a %{smart_count} contacto |||| Etiqueta añadida a %{smart_count} contactos",
        title: "Añadir etiqueta a los contactos",
      },
      merge: {
        action: "Fusionar con otro contacto",
        confirm: "Fusionar contactos",
        current_contact: "Contacto actual (se eliminará)",
        description: "Fusiona este contacto con otro.",
        error: "No se pudieron fusionar los contactos",
        merging: "Fusionando...",
        no_additional_data: "No hay datos adicionales que fusionar",
        select_target: "Selecciona un contacto con el que fusionar",
        success: "Contactos fusionados correctamente",
        target_contact: "Contacto de destino (se conservará)",
        title: "Fusionar contacto",
        warning_description:
          "Todos los datos se transferirán al segundo contacto. Esta acción no se puede deshacer.",
        warning_title: "Atención: operación destructiva",
        what_will_be_merged: "Qué se fusionará:",
      },
      filters: {
        before_last_month: "Antes del mes pasado",
        before_this_month: "Antes de este mes",
        before_this_week: "Antes de esta semana",
        managed_by_me: "Gestionados por mí",
        search: "Buscar nombre, empresa...",
        this_week: "Esta semana",
        today: "Hoy",
        tags: "Etiquetas",
        tasks: "Tareas",
      },
      hot: {
        empty_change_status:
          'Cambia el estado de un contacto añadiéndole una nota y pulsando en "mostrar opciones".',
        empty_hint: 'Los contactos con estado "caliente" aparecerán aquí.',
        title: "Contactos calientes",
      },
    },
    deals: {
      name: "Oportunidad |||| Oportunidades",
      fields: {
        name: "Nombre",
        description: "Descripción",
        company_id: "Empresa",
        contact_ids: "Contactos",
        category: "Categoría",
        amount: "Presupuesto",
        expected_closing_date: "Fecha de cierre prevista",
        stage: "Etapa",
      },
      action: {
        back_to_deal: "Volver a la oportunidad",
        create: "Crear oportunidad",
        new: "Nueva oportunidad",
      },
      field_categories: {
        misc: "Varios",
      },
      filters: {
        only_mine: "Solo las oportunidades que gestiono",
      },
      archived: {
        action: "Archivar",
        error: "Error: la oportunidad no se archivó",
        list_title: "Oportunidades archivadas",
        success: "Oportunidad archivada",
        title: "Oportunidad archivada",
        view: "Ver oportunidades archivadas",
      },
      inputs: {
        linked_to: "Vinculada a",
      },
      unarchived: {
        action: "Devolver al tablero",
        error: "Error: la oportunidad no se desarchivó",
        success: "Oportunidad desarchivada",
      },
      updated: "Oportunidad actualizada",
      empty: {
        before_create: "antes de crear una oportunidad.",
        description: "Parece que tu lista de oportunidades está vacía.",
        title: "No se encontraron oportunidades",
      },
      import: {
        title: "Importar oportunidades",
      },
      invalid_date: "Fecha no válida",
    },
    notes: {
      name: "Nota |||| Notas",
      forcedCaseName: "Nota",
      fields: {
        status: "Estado",
        date: "Fecha",
        attachments: "Adjuntos",
        contact_id: "Contacto",
        deal_id: "Oportunidad",
      },
      action: {
        add: "Añadir nota",
        add_first: "Añade tu primera nota",
        delete: "Eliminar nota",
        edit: "Editar nota",
        update: "Actualizar nota",
        add_this: "Añadir esta nota",
      },
      sheet: {
        create: "Crear nota",
        create_for: "Crear nota para %{name}",
        edit: "Editar nota",
        edit_for: "Editar nota de %{name}",
      },
      deleted: "Nota eliminada",
      empty: "Aún no hay notas",
      author_added: "%{name} añadió una nota",
      you_added: "Añadiste una nota",
      me: "Yo",
      list: {
        error_loading: "Error al cargar las notas",
      },
      note_for_contact: "Nota para %{name}",
      stepper: {
        hint: "Ve a la página de un contacto y añade una nota",
      },
      added: "Nota añadida",
      inputs: {
        add_note: "Añadir una nota",
        options_hint: "(adjuntar archivos o cambiar detalles)",
        show_options: "Mostrar opciones",
      },
      actions: {
        attach_document: "Adjuntar documento",
      },
      validation: {
        note_or_attachment_required: "Se requiere una nota o un adjunto",
      },
    },
    sales: {
      name: "Usuario |||| Usuarios",
      fields: {
        first_name: "Nombre",
        last_name: "Apellidos",
        email: "Correo electrónico",
        secondary_email: "Correo secundario",
        secondary_emails: "Correos secundarios",
        administrator: "Administrador",
        disabled: "Deshabilitado",
      },
      create: {
        error: "Ocurrió un error al crear el usuario.",
        success:
          "Usuario creado. En breve recibirá un correo para establecer su contraseña.",
        title: "Crear un nuevo usuario",
      },
      edit: {
        error: "Ocurrió un error. Inténtalo de nuevo.",
        record_not_found: "Registro no encontrado",
        success: "Usuario actualizado correctamente",
        title: "Editar a %{name}",
      },
      action: {
        new: "Nuevo usuario",
      },
    },
    tasks: {
      name: "Tarea |||| Tareas",
      forcedCaseName: "Tarea",
      fields: {
        text: "Descripción",
        due_date: "Fecha límite",
        type: "Tipo",
        contact_id: "Contacto",
        due_short: "vence",
      },
      action: {
        add: "Añadir tarea",
        create: "Crear tarea",
        edit: "Editar tarea",
      },
      actions: {
        postpone_next_week: "Posponer a la próxima semana",
        postpone_tomorrow: "Posponer a mañana",
        title: "acciones de la tarea",
      },
      added: "Tarea añadida",
      deleted: "Tarea eliminada correctamente",
      dialog: {
        create: "Crear tarea",
        create_for: "Crear tarea para %{name}",
      },
      sheet: {
        edit: "Editar tarea",
        edit_for: "Editar tarea de %{name}",
      },
      empty: "Aún no hay tareas",
      empty_list_hint: "Las tareas añadidas a tus contactos aparecerán aquí.",
      filters: {
        later: "Más adelante",
        overdue: "Vencidas",
        this_week: "Esta semana",
        today: "Hoy",
        tomorrow: "Mañana",
        with_pending: "Con tareas pendientes",
      },
      regarding_contact: "(Re: %{name})",
      updated: "Tarea actualizada",
    },
    tags: {
      name: "Etiqueta |||| Etiquetas",
      action: {
        add: "Añadir etiqueta",
        create: "Crear nueva etiqueta",
      },
      dialog: {
        color: "Color",
        create_title: "Crear una nueva etiqueta",
        edit_title: "Editar etiqueta",
        name_label: "Nombre de la etiqueta",
        name_placeholder: "Introduce el nombre de la etiqueta",
      },
      empty: "Aún no hay etiquetas.",
    },
  },
  crm: {
    action: {
      reset_password: "Restablecer contraseña",
    },
    auth: {
      first_name: "Nombre",
      last_name: "Apellidos",
      confirm_password: "Confirmar contraseña",
      confirmation_required:
        "Sigue el enlace que te acabamos de enviar por correo para confirmar tu cuenta.",
      recovery_email_sent:
        "Si eres un usuario registrado, recibirás en breve un correo para recuperar tu contraseña.",
      sign_in_failed: "No se pudo iniciar sesión.",
      sign_in_google_workspace: "Iniciar sesión con Google Workspace",
      signup: {
        create_account: "Crear cuenta",
        create_first_user:
          "Crea la primera cuenta de usuario para completar la configuración.",
        creating: "Creando...",
        initial_user_created: "Usuario inicial creado correctamente",
      },
      welcome_title: "Bienvenido a Escencial",
    },
    common: {
      account_manager: "Responsable de cuenta",
      activity: "Actividad",
      added: "añadió",
      details: "Detalles",
      last_activity_with_date: "última actividad %{date}",
      load_more: "Cargar más",
      misc: "Varios",
      past: "Pasadas",
      read_more: "Leer más",
      retry: "Reintentar",
      show_less: "Mostrar menos",
      copied: "¡Copiado!",
      copy: "Copiar",
      loading: "Cargando...",
      me: "Yo",
      task_count: "%{smart_count} tarea |||| %{smart_count} tareas",
    },
    activity: {
      added_company: "%{name} añadió la empresa",
      you_added_company: "Añadiste la empresa",
      added_contact: "%{name} añadió a",
      you_added_contact: "Añadiste a",
      added_note: "%{name} añadió una nota sobre",
      you_added_note: "Añadiste una nota sobre",
      added_note_about_deal: "%{name} añadió una nota sobre la oportunidad",
      you_added_note_about_deal: "Añadiste una nota sobre la oportunidad",
      added_deal: "%{name} añadió la oportunidad",
      you_added_deal: "Añadiste la oportunidad",
      at_company: "en",
      to: "a",
      load_more: "Cargar más actividad",
    },
    dashboard: {
      deals_chart: "Ingresos previstos de oportunidades",
      deals_pipeline: "Pipeline de oportunidades",
      latest_activity: "Última actividad",
      latest_activity_error: "Error al cargar la última actividad",
      latest_notes: "Mis últimas notas",
      latest_notes_added_ago: "añadida %{timeAgo}",
      upcoming_tasks: "Próximas tareas",
    },
    data_import: {
      button: "Importar CSV",
      complete:
        "Importación completada. Se importaron %{importCount} registros, con %{errorCount} errores",
      csv_file: "Archivo CSV",
      error:
        "No se pudo importar este archivo, asegúrate de proporcionar un archivo CSV válido.",
      in_progress: "Importación en curso…",
      progress:
        "Importados %{importCount} / %{rowCount} registros, con %{errorCount} errores.",
      remaining_time: "Tiempo restante estimado:",
      resource: "Recurso",
      sample_download: "Descargar CSV de ejemplo",
      sample_hint:
        "Aquí tienes un archivo CSV de ejemplo que puedes usar como plantilla",
      start: "Iniciar importación",
      stop: "Detener importación",
      stopped:
        "Importación detenida. Se importaron %{importCount} registros, con %{errorCount} errores",
      title: "Importar datos",
    },
    header: {
      import_data: "Importar desde JSON",
    },
    image_editor: {
      change: "Cambiar",
      drop_hint: "Suelta un archivo para subirlo, o haz clic para seleccionarlo.",
      editable_content: "Contenido editable",
      title: "Subir y redimensionar imagen",
      update_image: "Actualizar imagen",
    },
    import: {
      action: {
        download_error_report: "Descargar el informe de errores",
        import: "Importar",
        import_another: "Importar otro archivo",
      },
      error: {
        unable: "No se puede importar este archivo.",
      },
      idle: {
        description_1:
          "Puedes importar usuarios, empresas, contactos, notas y tareas.",
        description_2:
          "Los datos deben estar en un archivo JSON que siga el siguiente ejemplo:",
      },
      status: {
        all_success: "Todos los registros se importaron correctamente.",
        complete: "Importación completada.",
        failed: "Fallidos",
        imported: "Importados",
        in_progress:
          "Importación en curso, no abandones esta página.",
        some_failed: "Algunos registros no se importaron.",
        table_caption: "Estado de la importación",
      },
      title: "Importar desde JSON",
    },
    settings: {
      companies: {
        sectors: "Sectores",
      },
      dark_mode_logo: "Logo del modo oscuro",
      deals: {
        categories: "Categorías",
        currency: "Moneda",
        pipeline_help:
          "Selecciona qué etapas de oportunidad cuentan como oportunidades del pipeline.",
        pipeline_statuses: "Estados del pipeline",
        stages: "Etapas",
      },
      light_mode_logo: "Logo del modo claro",
      notes: {
        statuses: "Estados",
      },
      reset_defaults: "Restablecer valores por defecto",
      save_error: "No se pudo guardar la configuración",
      saved: "Configuración guardada correctamente",
      saving: "Guardando...",
      tasks: {
        types: "Tipos",
      },
      preferences: "Preferencias",
      title: "Ajustes",
      app_title: "Título de la aplicación",
      sections: {
        branding: "Marca",
      },
      validation: {
        duplicate: "%{display_name} duplicado: %{items}",
        in_use:
          "No se pueden eliminar %{display_name} que aún usan oportunidades: %{items}",
        validating: "Validando…",
        entities: {
          categories: "categorías",
          stages: "etapas",
        },
      },
    },
    theme: {
      dark: "Oscuro",
      label: "Tema",
      light: "Claro",
      system: "Sistema",
    },
    language: "Idioma",
    navigation: {
      label: "Navegación del CRM",
    },
    profile: {
      add_secondary_email: "Añadir un correo",
      email_taken: "%{email} ya lo usa otro usuario",
      no_secondary_emails: "Ninguno",
      secondary_email_invalid: "%{email} no es una dirección de correo válida",
      secondary_email_is_primary: "%{email} ya es tu dirección principal",
      secondary_email_taken: "%{email} ya lo usa otro usuario",
      too_many_secondary_emails:
        "No puedes añadir más de 10 direcciones de correo secundarias",
      secondary_emails_help:
        "Otras direcciones desde las que envías correos. Deja una vacía para eliminarla.",
      inbound: {
        description:
          "Puedes empezar a enviar correos a la dirección de correo entrante de tu servidor, por ejemplo añadiéndola al campo %{field}. Escencial procesará los correos y añadirá notas a los contactos correspondientes.",
        title: "Correo entrante",
      },
      mcp: {
        title: "Servidor MCP",
        description:
          "Usa esta URL para conectar tu asistente de IA a los datos de tu CRM mediante el Model Context Protocol (MCP).",
      },
      password: {
        change: "Cambiar contraseña",
      },
      password_reset_sent:
        "Se ha enviado un correo para restablecer la contraseña a tu dirección de correo",
      record_not_found: "Registro no encontrado",
      title: "Perfil",
      updated: "Tu perfil ha sido actualizado",
      update_error: "Ocurrió un error. Inténtalo de nuevo",
    },
    validation: {
      invalid_url: "Debe ser una URL válida",
      invalid_linkedin_url: "La URL debe ser de linkedin.com",
    },
  },
} satisfies CrmMessages;
