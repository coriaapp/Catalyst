//
//  GiveFullAccessView.swift
//  Catalyst
//
//  Created by Sangeeta Papinwar on 05/06/23.
//

import SwiftUI
import PhotosUI

struct GiveFullAccessView: View {
    var body: some View {
        NavigationView {
            Text("You need to give full photo library access.")
                .navigationTitle("Library")
        }
    }
}

struct GiveFullAccessView_Previews: PreviewProvider {
    static var previews: some View {
        GiveFullAccessView()
    }
}
