import { DocChunk, WorkspaceAsset } from '../types/ifs.js';

export class LocalStorageDB {
  private docChunks: Map<string, DocChunk> = new Map();
  private workspaceAssets: Map<string, WorkspaceAsset> = new Map();

  constructor() {
    this.seedComprehensiveTechDocs();
  }

  private seedComprehensiveTechDocs() {
    const comprehensiveDocs: DocChunk[] = [
      // ---------------------------------------------------------------------
      // DEVELOPER STUDIO & ARCHITECTURE / LAYERING GUIDE
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-layering-architecture',
        title: 'IFS Cloud Layering Architecture & Customization Standards (Cust Layer)',
        url: 'https://docs.ifs.com/techdocs/26r1/layering_architecture.htm',
        category: 'Architecture Guide',
        version: '26R1',
        content: `IFS Cloud code is structured into layers: Core, Extension, and Customization (Cust). Customizations MUST always reside in the Cust layer without altering Core files directly. In Developer Studio, customization models extend existing LUs using @Override annotations on PL/SQL packages (*.apy) and Marble entities (*.entity). Never modify Core files directly; create Cust layer files with identical LU names in the component's customization folder (e.g. apps/order/model/order/CustomerOrder.entity).`,
        codeBlocks: [
          `-- Cust Layer Override Example in Customer_Order_API.apy\n@Override\nPROCEDURE Check_Insert___\nIS\nBEGIN\n   super(newrec_, indrec_, attr_);\n   -- Cust Layer Validation Logic\nEND Check_Insert___;`
        ]
      },
      {
        id: 'techdocs-devstudio-project-setup',
        title: 'IFS Developer Studio Project Setup & Code Generation Workflow',
        url: 'https://docs.ifs.com/techdocs/26r1/devstudio_setup.htm',
        category: 'Developer Studio',
        version: '26R1',
        content: `IFS Developer Studio is the primary IDE for designing Marble DSL files (*.entity, *.projection, *.client) and PL/SQL LUs. Project setup requires configuring target Oracle database connection details, component model directories, and dictionary cache targets. Code generation automatically compiles Marble models into PL/SQL LU packages (*_API) and Aurena metadata definitions upon build.`,
        codeBlocks: [
          `ant -f build.xml compile`
        ]
      },

      // ---------------------------------------------------------------------
      // MARBLE DSL (ENTITIES, PROJECTIONS, CLIENT PAGES)
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-marble-entity-guide',
        title: 'IFS Marble DSL Entity Syntax & Association Syntax Guide',
        url: 'https://docs.ifs.com/techdocs/26r1/marble_entity_syntax.htm',
        category: 'Marble DSL',
        version: '26R1',
        content: `An Entity (*.entity) maps a logical unit to an Oracle database table/view. Key components include: from (base table), attributes (column definitions with Text, Number, Date, Timestamp, Enumeration), keys (primary key block), and associations (foreign key relationships). Attribute modifiers include label, maxlength, editable, and format.`,
        codeBlocks: [
          `entity CustomerOrder {\n   from = "CUSTOMER_ORDER_TAB";\n   attribute OrderNo Text {\n      label = "Order No";\n      maxlength = 30;\n      editable = [ETag = null];\n   }\n   attribute Description Text;\n   keys {\n      key OrderNo;\n   }\n   association CustomerRef for CustomerInfo {\n      cardinality = "1..*";\n      where = "CustomerNo = :CustomerId";\n   }\n}`
        ]
      },
      {
        id: 'techdocs-marble-projection-guide',
        title: 'IFS Marble DSL Projection Architecture & OData Endpoint Modeling',
        url: 'https://docs.ifs.com/techdocs/26r1/marble_projection_syntax.htm',
        category: 'Marble DSL',
        version: '26R1',
        content: `A Projection (*.projection) defines the OData service interface exposed to Aurena clients and REST API consumers. It declares entitysets, CRUD permissions, actions (state-changing mutations requiring initialcheck implementation), functions (read-only queries), and unbound structures. Actions MUST include 'initialcheck implementation;' for security checks.`,
        codeBlocks: [
          `projection CustomerOrderHandling;\ncomponent ORDER;\nlayer Core;\n\nentityset CustomerOrderSet for CustomerOrder;\n\n@Override\nentity CustomerOrder {\n   crud = Create, Read, Update, Delete;\n}\n\naction ReleaseOrder {\n   initialcheck implementation;\n   parameter OrderNo Text;\n}`
        ]
      },
      {
        id: 'techdocs-marble-client-guide',
        title: 'IFS Aurena Client UX Syntax (Pages, Groups, Lists, Commands)',
        url: 'https://docs.ifs.com/techdocs/26r1/marble_client_syntax.htm',
        category: 'Marble DSL',
        version: '26R1',
        content: `Client files (*.client / *.page) construct Aurena responsive web pages using components like page, group, list, selector, dialog, assistant, and command. Commands execute actions, call functions, navigate pages, or display confirm/success messages. Use expressions like enabled = [State = "Planned"] for dynamic UI state control.`,
        codeBlocks: [
          `client CustomerOrderHandling;\ncomponent ORDER;\nprojection CustomerOrderHandling;\n\npage Form using CustomerOrderSet {\n   label = "Customer Order";\n   selector CustomerOrderSelector;\n   group CustomerOrderMainGroup;\n   command ReleaseOrderCommand;\n}\n\ncommand ReleaseOrderCommand for CustomerOrder {\n   label = "Release Order";\n   enabled = [State = "Planned"];\n   execute {\n      confirm("Are you sure you want to release order ${'${OrderNo}'}?") {\n         when OK {\n            call ReleaseOrder(OrderNo);\n            success("Order released.");\n         }\n      }\n   }\n}`
        ]
      },

      // ---------------------------------------------------------------------
      // PL/SQL LU BUSINESS LOGIC & FRAMEWORK APIS
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-plsql-lu-framework',
        title: 'IFS PL/SQL LU Implementation Methods & Core Framework APIs',
        url: 'https://docs.ifs.com/techdocs/26r1/plsql_lu_framework.htm',
        category: 'Business Logic Development',
        version: '26R1',
        content: `IFS PL/SQL packages (*_API) enforce business logic using standard lifecycle hooks: Prepare_Insert___ (default values), Check_Insert___ / Check_Update___ (validations), Insert___ / Update___ (database DML), Check_Common___ (shared validations), and Check_Delete___ / Delete___ (cascade/restricted deletes). Use Error_SYS.Record_General to raise user errors. Use Client_SYS to parse attribute strings (attr_). Never issue raw COMMIT or ROLLBACK inside LU methods.`,
        codeBlocks: [
          `@Override\nPROCEDURE Check_Common___ (\n   oldrec_ IN     customer_order_tab%ROWTYPE,\n   newrec_ IN OUT customer_order_tab%ROWTYPE,\n   indrec_ IN OUT Indicator_Rec,\n   attr_   IN OUT VARCHAR2 )\nIS\nBEGIN\n   super(oldrec_, newrec_, indrec_, attr_);\n   IF newrec_.amount < 0 THEN\n      Error_SYS.Record_General(lu_name_, 'INVALIDAMT: Order amount cannot be negative.');\n   END IF;\nEND Check_Common___;`
        ]
      },
      {
        id: 'techdocs-plsql-error-handling',
        title: 'Error_SYS, Client_SYS, and Transaction_SYS API Reference',
        url: 'https://docs.ifs.com/techdocs/26r1/framework_apis.htm',
        category: 'Business Logic Development',
        version: '26R1',
        content: `Standard IFS Framework PL/SQL utilities: 1) Error_SYS.Record_General(lu_name_, 'KEY: Error text'): Raises translated error; 2) Client_SYS.Add_To_Attr('FIELD', val, attr_): Appends attribute value; 3) Client_SYS.Get_Item_Value('FIELD', attr_): Extracts attribute value; 4) Fnd_Session_API.Get_Fnd_User: Returns current IFS user; 5) Transaction_SYS.Deferred_Call: Schedules background job execution.`,
        codeBlocks: [
          `Client_SYS.Add_To_Attr('CREATED_DATE', sysdate, attr_);\nuser_id_ := Fnd_Session_API.Get_Fnd_User();`
        ]
      },

      // ---------------------------------------------------------------------
      // INTEGRATION & REST / ODATA
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-integration-odata-rest',
        title: 'IFS Cloud OData v4 REST API Endpoint Integration & Querying',
        url: 'https://docs.ifs.com/techdocs/26r1/odata_rest_integration.htm',
        category: 'Integration',
        version: '26R1',
        content: `IFS Cloud exposes all Projections as OData v4 endpoints under /main/ifsadmin/projection/v1/{ProjectionName}.svc/. Supports standard OData query options: $filter, $select, $expand, $orderby, $top, $skip. Authentication uses OAuth 2.0 Bearer JWT tokens. CRUD operations map to GET (Read), POST (Create/Action call), PATCH (Update), and DELETE.`,
        codeBlocks: [
          `curl -X GET "https://ifs.example.com/main/ifsadmin/projection/v1/CustomerOrderHandling.svc/CustomerOrderSet?$filter=State%20eq%20'Planned'&$select=OrderNo,Description" -H "Authorization: Bearer <JWT_TOKEN>" -H "Accept: application/json"`
        ]
      },
      {
        id: 'techdocs-ifs-connect-messaging',
        title: 'IFS Connect Message Routers, Message Processors & Transformers',
        url: 'https://docs.ifs.com/techdocs/26r1/ifs_connect.htm',
        category: 'Integration',
        version: '26R1',
        content: `IFS Connect is the enterprise integration broker. Components include: Routing Rules (evaluates incoming XML/JSON headers), Routing Addresses (REST, SOAP, File, Mail), Transformers (XSLT or Java JSON/XML mappers), and PL/SQL Message Processors. Processors accept CLOB payload in_msg_ and process data into LUs.`,
        codeBlocks: [
          `PROCEDURE Process_Inbound_Order (in_msg_ IN CLOB) IS\nBEGIN\n   -- Parse XML payload & invoke LU API\n   NULL;\nEND Process_Inbound_Order;`
        ]
      },

      // ---------------------------------------------------------------------
      // REPORTING & LOBBY DEVELOPMENT
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-reporting-operational-rdf',
        title: 'IFS Operational Reporting Framework (RDF, RDL, Report Designer)',
        url: 'https://docs.ifs.com/techdocs/26r1/reporting_framework.htm',
        category: 'Reporting',
        version: '26R1',
        content: `IFS Operational Reports rely on RDF packages (*_RPI) and RDL/RDLC layouts. The RDF report assembler script populates temporary result table INFO_SERVICES_RPT using Report_SYS.Define_Report_ and Xml_Record_Writer_SYS to output structured XML datasets for SSRS / IFS Report Designer.`,
        codeBlocks: [
          `Report_SYS.Define_Report_('CUSTOMER_ORDER_REP', 'ORDER', 'Customer Order Report', 'CUSTOMER_ORDER_RPI.Execute_Report', 'INFO_SERVICES_RPT');`
        ]
      },

      // ---------------------------------------------------------------------
      // SECURITY, PERMISSIONS & TAILORING
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-security-permissions-grants',
        title: 'IFS Security Architecture, Projection Grants & Functional Roles',
        url: 'https://docs.ifs.com/techdocs/26r1/security_grants.htm',
        category: 'Security',
        version: '26R1',
        content: `IFS Cloud enforces projection-level security and Database object execution security. Permission Sets (e.g. FND_ENDUSER, CUSTOMER_ORDER_ADMIN) must be granted access to Projections. In PL/SQL, methods use Security_SYS.Has_Projection_Access or annotations like @UncheckedAccess (bypasses security checks for pure getters) or @ServerOnlyAccess.`,
        codeBlocks: [
          `GRANT EXECUTE ON CustomerOrderHandling TO FND_ENDUSER;`
        ]
      },
      {
        id: 'techdocs-tailoring-custom-fields',
        title: 'IFS Tailoring: Custom Fields, Custom Events & Event Actions',
        url: 'https://docs.ifs.com/techdocs/26r1/tailoring_custom_fields.htm',
        category: 'Tailoring Guide',
        version: '26R1',
        content: `IFS Cloud tailoring allows adding Custom Fields (CF_*) and Custom Events without altering Core PL/SQL. Custom fields generate CF views (*_CFV) and CFI packages. Custom Events monitor LU table triggers and trigger Event Actions (PL/SQL scripts, Email notifications, REST webhooks, or REST Call tasks).`,
        codeBlocks: [
          `-- Custom Field PL/SQL Expression\nCustomer_Order_CFV.Get_CF$_Custom_Status(v.objkey)`
        ]
      },

      // ---------------------------------------------------------------------
      // MULTI-VERSION RELEASE DIFFERENCES (23R2 -> 26R1)
      // ---------------------------------------------------------------------
      {
        id: 'techdocs-release-differences-all',
        title: 'IFS Cloud Release Evolution & Feature Comparison (23R2, 24R1, 24R2, 25R1, 25R2, 26R1)',
        url: 'https://docs.ifs.com/techdocs/26r1/release_evolution.htm',
        category: 'Upgrade Guide',
        version: '26R1',
        content: `Overview of IFS Cloud framework evolution: 1) 23R2: Initial Aurena responsive framework stabilization and basic OData v4 REST endpoints; 2) 24R1: Grid layout enhancements and OData stream features; 3) 24R2: Developer Studio custom fragment extensions; 4) 25R1: Aurena page performance optimizations and strict CRUD annotations; 5) 25R2: Mandatory projection initialcheck security checks; 6) 26R1: Native AI copilot annotations (@AiAgent, @ODataStream) and enhanced customization layering standards.`,
        codeBlocks: [
          `-- 26R1 Mandatory Projection Action Check\naction ReleaseOrder {\n   initialcheck implementation;\n}`
        ]
      },
      {
        id: 'techdocs-marble-overview-23r2',
        title: 'IFS Cloud 23R2 Architecture & Marble DSL Foundation',
        url: 'https://docs.ifs.com/techdocs/23r2/marble_dsl_overview.htm',
        category: 'Architecture Guide',
        version: '23R2',
        content: `IFS Cloud 23R2 base architecture establishing basic Marble DSL models (*.entity, *.projection, *.client) and Aurena client page definitions.`,
        codeBlocks: [
          `entity CustomerOrder {\n   from = "CUSTOMER_ORDER_TAB";\n}`
        ]
      }
    ];

    for (const doc of comprehensiveDocs) {
      this.docChunks.set(doc.id, doc);
    }
  }

  public addDocChunk(chunk: DocChunk) {
    this.docChunks.set(chunk.id, chunk);
  }

  public addWorkspaceAsset(asset: WorkspaceAsset) {
    this.workspaceAssets.set(asset.path, asset);
  }

  public searchDocChunks(query: string, version?: string): DocChunk[] {
    const q = query.toLowerCase();
    const results: DocChunk[] = [];

    for (const chunk of this.docChunks.values()) {
      if (version && version !== 'ALL' && chunk.version.toLowerCase() !== version.toLowerCase()) continue;

      const titleMatch = chunk.title.toLowerCase().includes(q);
      const contentMatch = chunk.content.toLowerCase().includes(q);
      const categoryMatch = chunk.category.toLowerCase().includes(q);
      const versionMatch = chunk.version.toLowerCase().includes(q);

      if (titleMatch || contentMatch || categoryMatch || versionMatch) {
        let score = 0;
        if (titleMatch) score += 10;
        if (contentMatch) score += 5;
        if (categoryMatch) score += 2;
        if (versionMatch) score += 4;

        results.push({ ...chunk, score });
      }
    }

    return results.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  public searchWorkspaceAssets(query: string, assetType?: string): WorkspaceAsset[] {
    const q = query.toLowerCase();
    const results: WorkspaceAsset[] = [];

    for (const asset of this.workspaceAssets.values()) {
      if (assetType && asset.assetType !== assetType) continue;

      if (
        asset.filename.toLowerCase().includes(q) ||
        asset.content.toLowerCase().includes(q) ||
        asset.path.toLowerCase().includes(q)
      ) {
        results.push(asset);
      }
    }

    return results;
  }

  public getAllWorkspaceAssets(): WorkspaceAsset[] {
    return Array.from(this.workspaceAssets.values());
  }

  public getAllDocChunks(): DocChunk[] {
    return Array.from(this.docChunks.values());
  }
}

export const db = new LocalStorageDB();
